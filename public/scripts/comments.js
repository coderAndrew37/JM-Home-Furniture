const fetchComments = async (blogId) => {
  const commentsSection = document.getElementById("comments-section");
  commentsSection.innerHTML = `<p>Loading comments...</p>`;

  try {
    const response = await fetch(`/api/comments/${blogId}`);
    const comments = await response.json();

    if (comments.length === 0) {
      commentsSection.innerHTML = `<p class="text-idcText">
        <i class="fas fa-info-circle"></i> No comments yet. Be the first to share your thoughts!
      </p>`;
      return;
    }

    commentsSection.innerHTML = comments
      .map(
        (comment) => `
        <div class="comment mb-4 p-4 border rounded-lg shadow-md bg-idcAccent">
          <strong class="text-idcPrimary">${comment.user}</strong>
          <p class="mt-2 text-idcText">${comment.comment}</p>
          <span class="text-sm text-gray-400">${new Date(
            comment.createdAt
          ).toLocaleString()}</span>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching comments:", error);
    commentsSection.innerHTML = `<p class="text-red-600">Failed to load comments. Please try again later.</p>`;
  }
};

const submitComment = async (event) => {
  event.preventDefault();

  const blogId = new URLSearchParams(window.location.search).get("id");
  const username = document.getElementById("username").value.trim();
  const userComment = document.getElementById("user-comment").value.trim();

  const formMessage = document.querySelector(".form-message");
  const submitButton = document.querySelector(
    "#add-comment-form button[type='submit']"
  );

  // Validation check
  if (!username || !userComment) {
    formMessage.textContent = "All fields are required.";
    formMessage.classList.remove("text-green-600");
    formMessage.classList.add("text-red-600");
    return;
  }

  try {
    // Update button text to show submission in progress
    submitButton.textContent = "Submitting...";
    submitButton.disabled = true;

    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, user: username, comment: userComment }),
    });

    const result = await response.json();

    if (response.ok) {
      formMessage.textContent =
        result.message || "Comment submitted successfully!";
      formMessage.classList.remove("text-red-600");
      formMessage.classList.add("text-green-600");

      // Reset form
      document.getElementById("add-comment-form").reset();

      // Reload comments
      fetchComments(blogId);
    } else {
      formMessage.textContent =
        result.message || "Failed to submit the comment. Please try again.";
      formMessage.classList.remove("text-green-600");
      formMessage.classList.add("text-red-600");
    }
  } catch (error) {
    console.error("Error submitting comment:", error);
    formMessage.textContent =
      "An error occurred while submitting your comment. Please try again.";
    formMessage.classList.remove("text-green-600");
    formMessage.classList.add("text-red-600");
  } finally {
    // Reset button text and state
    submitButton.textContent = "Submit";
    submitButton.disabled = false;
  }
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const blogId = new URLSearchParams(window.location.search).get("id");

  if (blogId) {
    fetchComments(blogId);

    document
      .getElementById("add-comment-form")
      .addEventListener("submit", submitComment);
  }
});

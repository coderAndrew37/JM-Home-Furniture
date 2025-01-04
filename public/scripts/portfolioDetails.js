import { projects } from "/data/data.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  // Handle invalid or missing project ID
  if (!projectId) {
    document.getElementById("portfolio-details").innerHTML = `
      <p class="text-center text-xl font-bold">
        <i class="fas fa-exclamation-circle text-idcPrimary"></i> Project not found.
      </p>`;
    return;
  }

  // Find the project by ID
  const project = projects.find((p) => p.id === projectId);

  // If project not found, show error message
  if (!project) {
    document.getElementById("portfolio-details").innerHTML = `
      <p class="text-center text-xl font-bold">
        <i class="fas fa-exclamation-circle text-idcPrimary"></i> Project not found.
      </p>`;
    return;
  }

  // Render the project details
  document.getElementById("portfolio-details").innerHTML = `
    <h1 class="text-4xl font-idcSerif text-idcPrimary mb-6">${
      project.title
    }</h1>
    <p class="text-lg text-idcText mb-4">${project.desc}</p>

    <!-- Before and After Grids -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Before Images -->
      <div>
        <h2 class="text-2xl font-idcSerif text-idcPrimary mb-4">Before</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${project.before
            .map(
              (image) => `
            <img 
              src="${image}" 
              alt="Before Image" 
              class="rounded-lg shadow-lg w-full h-auto object-cover" 
            />`
            )
            .join("")}
        </div>
      </div>

      <!-- After Images -->
      <div>
        <h2 class="text-2xl font-idcSerif text-idcPrimary mb-4">After</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${project.after
            .map(
              (image) => `
            <img 
              src="${image}" 
              alt="After Image" 
              class="rounded-lg shadow-lg w-full h-auto object-cover" 
            />`
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
});

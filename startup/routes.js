const contacts = require("../routes/contacts.js");
const newsletter = require("../routes/newsletter.js");
const leads = require("../routes/leads.js");
const comments = require("../routes/comments.js");
const products = require("../routes/products.js");
const auth = require("../routes/auth.js");
const cart = require("../routes/cart.js");
const orders = require("../routes/orders.js");
const admin = require("../routes/admin.js");
module.exports = function (app) {
  app.use("/api/contacts", contacts);
  app.use("/api/newsletter", newsletter); // Added the newsletter route
  app.use("/api/leads", leads); // Added the leads route
  app.use("/api/comments", comments); // Added the comments route
  app.use("/api/products", products); // Added the products route
  app.use("/api/users", auth);
  app.use("/api/cart", cart);
  app.use("/api/orders", orders);
  app.use("/api/admin", admin);
};

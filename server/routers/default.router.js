const express = require("express");
const r = express.Router();
const authenticateMiddleware = require("./../middlewares/authenticate.middleware");

const contactController = require("./../controllers/contact.controller");

r.use(authenticateMiddleware);

// contacts
r.post("/contacts", contactController.store);
r.get("/contacts", contactController.get);
r.delete("/contacts/:id", contactController.deleteById);
r.put("/contacts/:id", contactController.update);

module.exports = r;
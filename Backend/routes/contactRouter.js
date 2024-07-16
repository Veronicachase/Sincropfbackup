const express = require("express");
const { addContact,getContactById,getAllContacts, deleteContact, updateContact } = require("../controllers/contactController");
const contactRouter = express.Router();
const authenticateToken = require("../middleWares/authenticateToken")


contactRouter.use(authenticateToken);

contactRouter.get("/:contactId", getContactById);
contactRouter.get("/", getAllContacts);
contactRouter.post("/", addContact);
contactRouter.delete("/:contactId", deleteContact);
contactRouter.patch("/:contactId", updateContact);

module.exports = contactRouter;
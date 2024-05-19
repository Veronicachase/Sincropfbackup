const express = require("express");
const { addContact,getContact,getAllContacts, deleteContact, updateContact } = require("../controllers/contactController");
const contactRouter = express.Router();

contactRouter.get("/:contactId",getContact );
contactRouter.get("/",getAllContacts );
contactRouter.post("/", addContact);
contactRouter.delete("/:contactId", deleteContact);
contactRouter.patch("/:contactId", updateContact);

module.exports = contactRouter;
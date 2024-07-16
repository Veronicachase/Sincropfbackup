const contactDao = require("../services/DAO/contactsDao");
const path = require("path");

const addContact = async (req, res) => {
    try {
        const userId = req.user.userId;
        const contactId = await contactDao.addContact({...req.body, userId});
        res.status(201).json({ message: "contacto creado exitosamente", contactId });
    } catch (error) {
        console.error("Error al agregar el contacto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getContactById = async (req, res) => {
    try {
        
        const contactId = req.params.contactId;
        const userId = req.user.userId; 
        const contact = await contactDao.getContactById(contactId, userId);
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: "contacto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el contacto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const contacts = await contactDao.getAllContacts(userId);
        if (contacts) {
            res.json(contacts);
        } else {
            res.status(404).json({ message: "No hay contactos creados" });
        }
    } catch (error) {
        console.error("Error al obtener tus contactos:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.contactId;
        const userId = req.user.userId;
        const updatedData = req.body;
        await contactDao.updateContact(userId, contactId, updatedData);
        res.json({ message: "contact actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el contacto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.contactId;
        const userId = req.user.userId;
        await contactDao.deleteContact(userId, contactId);
        res.json({ message: "contacto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el contacto:", error.message);
        res.status(500).json({ error: error.message });
    }
};



module.exports = { addContact,deleteContact, updateContact, getContactById,getAllContacts };

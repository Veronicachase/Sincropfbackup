const sectionsDao = require("../services/DAO/sectionsDao");

const getSections = async (req, res) => {
    try {
        const sections = await sectionsDao.getSections();
        res.status(201).json({ sections });
    } catch (error) {
        console.error("Error al traer las secciones:", error.message);
      res.status(500).json({ error: error.message });
    }
}

module.exports = {getSections}
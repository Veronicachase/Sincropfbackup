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


const addSection = async (req, res) => {
    const { projectId } = req.params;
    const { section } = req.body;

    if (!section) {
        return res.status(400).json({ error: 'Section is required' });
    }

    try {
        const result = await sectionsDao.addSection(projectId, section);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error adding section:", error);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = {getSections, addSection}
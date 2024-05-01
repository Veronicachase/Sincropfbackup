const projectDao = require("../services/DAO/projectDao");
const path = require("path");

const addProject = async (req, res) => {
    try {
        const projectId = await projectDao.addProject(req.body);
        res.status(201).json({ message: "proyecto creado exitosamente", projectId });
    } catch (error) {
        console.error("Error al agregar el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await projectDao.getProject(projectId);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: "proyecto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const updatedData = req.body;
        await projectDao.updateProject(projectId, updatedData);
        res.json({ message: "project actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        await projectDao.deleteProject(projectId);
        res.json({ message: "proyecto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};





module.exports = { addProject,deleteProject, updateProject, getProject };

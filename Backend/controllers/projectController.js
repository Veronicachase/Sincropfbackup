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

const getAllProjects = async (req, res) => {
    try {
        const projects = await projectDao.getAllProjects();
        if (projects) {
            res.json(projects);
        } else {
            res.status(404).json({ message: "No hay proyectos creados" });
        }
    } catch (error) {
        console.error("Error al obtener tus proyectos:", error.message);
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

/*  controladores para Section */

const deleteSection = async (req, res) => {
    const { projectId, sectionKey } = req.params;
    try {
        const project = await projectDao.getProject(projectId);
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        const sections = JSON.parse(project.sections);
        delete sections[sectionKey];
        await projectDao.updateSection(projectId, sections);
        res.json({ message: "Sección eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar la sección:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateSection = async (req, res) => {
    const { projectId, sectionKey } = req.params;
    const sectionData = req.body; 
    try {
        const project = await projectDao.getProject(projectId);
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        const sections = JSON.parse(project.sections);
        sections[sectionKey] = sectionData; 
        await projectDao.updateSection(projectId, sections);
        res.json({ message: "Sección actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar la sección:", error.message);
        res.status(500).json({ error: error.message });
    }
};
const addSection = async (req, res) => {
    const { projectId } = req.params;
    const newSectionData = req.body; 
    try {
        await projectDao.addSection(projectId, newSectionData);
        res.status(201).json({ message: "Sección agregada exitosamente" });
    } catch (error) {
        console.error("Error al agregar la sección:", error.message);
        res.status(500).json({ error: error.message });
    }
};




module.exports = { addProject,deleteProject, updateProject, getProject,getAllProjects, updateSection, deleteSection, addSection };

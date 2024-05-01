const proyectoDao = require("../services/DAO/proyectoDao");
const path = require("path");

const addproyecto = async (req, res) => {
    try {
        const projectId = await proyectoDao.addproyecto(req.body);
        res.status(201).json({ message: "Proyecto creado exitosamente", projectId });
    } catch (error) {
        console.error("Error al agregar el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const getProyecto = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const proyecto = await proyectoDao.getProyecto(projectId);
        if (proyecto) {
            res.json(proyecto);
        } else {
            res.status(404).json({ message: "Proyecto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateProyecto = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const updatedData = req.body;
        await proyectoDao.updateProyecto(projectId, updatedData);
        res.json({ message: "Proyecto actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteProyecto = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        await proyectoDao.deleteProyecto(projectId);
        res.json({ message: "Proyecto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error.message);
        res.status(500).json({ error: error.message });
    }
};





module.exports = { addproyecto,deleteProyecto, updateProyecto, getProyecto };

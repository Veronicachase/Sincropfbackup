const projectDao = require("../services/DAO/projectDao");
const path = require("path");
const uploadImage = require('../public/cloudinary/uploadImage');



const addProject = async (req, res) => {
    console.log("Request body:", req.body); 
    try {
      const { body, file } = req;
  
      let imageUrl = '';
      if (file) {
      
        const result = await uploadImage(file.path);
        imageUrl = result.secure_url;
      }
  
      
      let sections;
      try {
        sections = body.sections ? JSON.parse(body.sections) : [];
      } catch (err) {
        throw new Error('Invalid sections JSON format');
      }
  
   
      const projectData = { ...body, sections, image: imageUrl };
      
    
      const defaultSections = ["pool", "kitchen", "laundry", "roof", "room", "bathRoom", "hall", "livingRoom"];
      if (!projectData.sections.length) {
        projectData.sections = defaultSections;
      } else {
        projectData.sections = projectData.sections.concat(defaultSections);
      }
  
   
      const projectId = await projectDao.addProject(projectData);
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
        const { body, file } = req;

        let imageUrl = '';
        if (file) {
            const result = await uploadImage(file.path);
            imageUrl = result.secure_url;
        }

        let sections;
        try {
            sections = body.sections ? JSON.parse(body.sections) : [];
        } catch (err) {
            throw new Error('Formato json invalido');
        }

        const updatedData = { ...body, sections, image: imageUrl };

        await projectDao.updateProject(projectId, updatedData);
        res.json({ message: "Proyecto actualizado correctamente" });
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
        await projectDao.deleteSection(projectId, sections);
        res.json({ message: "Sección eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar la sección:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateSection = async (req, res) => {
    const { projectId, sectionKey } = req.params;
  
    try {
        const project = await projectDao.getProject(projectId);
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        let sections = JSON.parse(project.sections);
        if (!sections.includes(sectionKey)) {
            sections.push(sectionKey); 
        } else {
            return res.status(409).json({ message: "La sección ya existe" });
        }
        await projectDao.updateSection(projectId, sections);
        res.json({ message: "Sección actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar la sección:", error.message);
        res.status(500).json({ error: error.message });
    }
};



const addSection = async (req, res) => {
    const { projectId } = req.params;
    const { section: newSectionData } = req.body;
  
    try {
      const project = await projectDao.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }
  
      let sections = [];
      if (project.sections) {
        sections = JSON.parse(project.sections);
      }
  
      if (!sections.includes(newSectionData)) {
        sections.push(newSectionData);
        await projectDao.updateSection(projectId, sections); 
        res.status(201).json({ message: "Sección agregada exitosamente" });
      } else {
        res.status(409).json({ message: "La sección ya existe" });
      }
    } catch (error) {
      console.error("Error al agregar la sección:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

const getSections = async (req, res) => {
    try {
        const sections = await projectDao.getSections();
        res.status(201).json({ sections });
    } catch (error) {
        console.error("Error al traer las secciones:", error.message);
      res.status(500).json({ error: error.message });
    }
}


module.exports = { addProject,deleteProject, updateProject, getProject,getAllProjects, updateSection, deleteSection, addSection, getSections };

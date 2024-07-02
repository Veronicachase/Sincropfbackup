const projectDao = require("../services/DAO/projectDao");
const path = require("path");
const uploadImage = require('../public/cloudinary/uploadImage');
const cloudinary = require('cloudinary').v2;



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
        sections = project.sections;
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


const uploadPDF = async (req, res) => {
  try {
    console.log('req.params:', req.params); 
    console.log('req.body:', req.body);
    const { projectId } = req.params;
    const file = req.file;

    // Encuentra el proyecto y actualiza su campo reports
    const project = await projectDao.getProject(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado/ uplaodPDF' });
    }
    if (!project.reports) {
      project.reports = [];
    }

    // Subir el PDF a Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'raw', 
    });
    console.log('Resultado de lo subido a Cloudinary:', result);

    const newReport = {
      id: Date.now().toString(),
      url: result.secure_url,
      createdAt: new Date(),
      original_filename: result.original_filename
    };
    project.reports.push(newReport);
    await projectDao.updateProject(projectId, { reports: project.reports });

    res.status(201).json({ message: 'Reporte subido exitosamente', url: result.secure_url });
    console.log('Resultado de los datos recibidos desde newReport:', newReport);
  } catch (error) {
    console.error('Error al subir el reporte:', error);
    res.status(500).json({ error: 'Error al subir el reporte' });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { projectId, reportId } = req.params;
    const project = await projectDao.getProject(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const reportIndex = project.reports.findIndex((report) => report.id === reportId);
    if (reportIndex === -1) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    const publicId = project.reports[reportIndex].url.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    project.reports.splice(reportIndex, 1);
    await projectDao.updateProject(projectId, { reports: project.reports });

    res.status(200).json({ message: 'Reporte eliminado' });
  } catch (error) {
    console.error('Error al eliminar el reporte:', error);
    res.status(500).json({ error: 'Error al eliminar el reporte' });
  }
};

const getAllReports = async (req, res) => {
  try {
    const projects = await projectDao.getAllProjects();
    let allReports = [];
    
    projects.forEach(project => {
      if (project.reports && project.reports.length > 0) {
        allReports = [...allReports, ...project.reports];
      }
    });

    res.status(200).json(allReports);
  } catch (error) {
    console.error('Error al obtener todos los reportes:', error);
    res.status(500).json({ error: 'Error al obtener todos los reportes' });
  }
};







module.exports = { addProject,deleteProject, updateProject, getProject,getAllProjects, updateSection, deleteSection, addSection, getSections, uploadPDF, deleteReport,getAllReports   };

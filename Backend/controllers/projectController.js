const projectDao = require("../services/DAO/projectDao");
const path = require("path");
const uploadImage = require("../public/cloudinary/uploadImage");
const cloudinary = require("cloudinary").v2;

const addProject = async (req, res) => {
  const userId = req.user.userId;
  

  try {
    const { body, file } = req;

    let imageUrl = "";
    if (file) {

      imageUrl = file.path;
    }

    let sections ;

    console.log("Archivo recibido por multer controller:", file);

    try {
      sections = body.sections ? JSON.parse(body.sections) : [];
    } catch (err) {
      throw new Error("Invalid sections JSON format");
    }

    const projectData = { ...body, sections, userId, image: imageUrl };

    const defaultSections = [
      "pool",
      "kitchen",
      "laundry",
      "roof",
      "room",
      "bathRoom",
      "hall",
      "livingRoom",
    ];

    if (!projectData.sections.length) {
      projectData.sections = defaultSections;
    } else {
      projectData.sections = projectData.sections.concat(defaultSections);
    }

    const projectId = await projectDao.addProject(userId, projectData);
    res
      .status(201)
      .json({ message: "proyecto creado exitosamente", projectId });
  } catch (error) {
    console.error("Error al agregar el proyecto:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user.userId;
    const project = await projectDao.getProject(projectId, userId);
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
    const userId = req.user.userId;
    console.log("userId en el controlador:", userId);
    const projects = await projectDao.getAllProjects(userId);
    if (projects && projects.length > 0) {
      res.status(200).json(projects);
    } else {
      res.status(204).send(); 
    }
  } catch (error) {
    console.error("Error al obtener tus proyectos:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user.userId;
    const { body, file } = req;

    let imageUrl = "";
    if (file) {
      console.log("Archivo recibido:", file);
      const result = await uploadImage(file.path);
      console.log("Resultado de Cloudinary:", result);
      imageUrl = result.secure_url;
      if (!imageUrl) {
        throw new Error("Error al cargar la imagen en Cloudinary");
      }
    }

    let sections;
    try {
      sections = body.sections ? JSON.parse(body.sections) : [];
    } catch (err) {
      throw new Error("Formato json invalido");
    }

    const updatedData = { ...body, sections, image: imageUrl };

    await projectDao.updateProject(projectId, userId, updatedData);
    res.json({ message: "Proyecto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user.userId;
    await projectDao.deleteProject(projectId, userId);
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

const addSectionToProject = async (req, res) => {
  const { projectId } = req.params;
  const { section: newSectionData } = req.body;
  const userId = req.user.userId;

  try {
    const project = await projectDao.getProject(projectId, userId);
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    await projectDao.addSectionToProject(projectId, userId, newSectionData);
    return res.status(200).json({ message: "Sección agregada exitosamente" });
  } catch (error) {
    console.error("Error agregando sección al proyecto:", error.message);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

{
  /*const addSectionToProject = async (req, res) => {
    const { projectId } = req.params;
    const { section: newSectionData } = req.body;
    const userId = req.user.userId;
  
  try {
    const project = await projectDao.getProject(projectId, userId);
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    let sections =[];
    const defaultSections = ["pool", "kitchen", "laundry", "roof", "room", "bathRoom", "hall", "livingRoom"];
  
    if (project.sections) {
      try {
        const existingSections = JSON.parse(project.sections);
        sections = [...defaultSections, ...existingSections];
      } catch (error) {
        console.error("Error parsing sections:", error.message);
        sections = defaultSections;
      }
    }

    // Eliminar duplicados
    sections = Array.from(new Set(sections));

    if (!sections.includes(newSectionData)) {
      sections.push(newSectionData);
      await projectDao.addSectionToProject(projectId, userId, sections);
      res.status(201).json({ message: "Sección agregada exitosamente" });
    } else {
      res.status(409).json({ message: "La sección ya existe" });
    }
  } catch (error) {
    console.error("Error al agregar la sección:", error.message);
    res.status(500).json({ error: error.message });
  }
};*/
}

const getSections = async (req, res) => {
  try {
    const sections = await projectDao.getSections();
    res.status(201).json({ sections });
  } catch (error) {
    console.error("Error al traer las secciones:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const uploadPDFReport = async (req, res) => {
  try {
    const { projectId } = req.params;
    const file = req.file;
    const userId = req.user.userId;

    const project = await projectDao.getProject(projectId, userId);
    if (!project) {
      return res
        .status(404)
        .json({ error: "Proyecto no encontrado/ uplaodPDF" });
    }
    if (!project.reports) {
      project.reports = [];
    }

    // Subir el PDF a Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
    });

    const newReport = {
      id: Date.now().toString(),
      url: result.secure_url,
      createdAt: new Date(),
      original_filename: result.original_filename,
    };
    project.reports.push(newReport);
    await projectDao.updateProject(projectId, req.user.userId, {
      reports: project.reports,
    });

    res
      .status(201)
      .json({ message: "Reporte subido exitosamente", url: result.secure_url });
  } catch (error) {
    console.error("Error al subir el reporte:", error);
    res.status(500).json({ error: "Error al subir el reporte" });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { projectId, reportId } = req.params;
    const userId = req.user.userId;
    const project = await projectDao.getProject(projectId, userId);
    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    const reportIndex = project.reports.findIndex(
      (report) => report.id === reportId
    );
    if (reportIndex === -1) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    const publicId = project.reports[reportIndex].url
      .split("/")
      .pop()
      .split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    project.reports.splice(reportIndex, 1);
    await projectDao.updateProject(projectId, userId, {
      reports: project.reports.length ? project.reports : [],
    });

    res.status(200).json({ message: "Reporte eliminado" });
  } catch (error) {
    console.error("Error al eliminar el reporte:", error);
    res.status(500).json({ error: "Error al eliminar el reporte" });
  }
};

const getAllReports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await projectDao.getAllReports(userId);
    let allReports = [];

    projects.forEach((project) => {
      if (project.reports && project.reports.length > 0) {
        allReports = [...allReports, ...project.reports];
      }
    });

    res.status(200).json(allReports);
  } catch (error) {
    console.error("Error al obtener todos los reportes:", error);
    res.status(500).json({ error: "Error al obtener todos los reportes" });
  }
};

module.exports = {
  addProject,
  deleteProject,
  updateProject,
  getProject,
  getAllProjects,
  deleteSection,
  addSectionToProject,
  updateSection,
  getSections,
  uploadPDFReport,
  deleteReport,
  getAllReports,
};

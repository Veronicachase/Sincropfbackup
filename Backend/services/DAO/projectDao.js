// aquí creao el Dao de proyectos incluida la sección de projects que sections que es un json ["kitchen", "livingRoom", "etc"]

const db = require("../db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");

const projectDao = {};

projectDao.addProject = async (userId, projectData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let projectObj = {
      projectName: projectData.projectName || "",
      addressDescription: projectData.addressDescription || "",
      block: projectData.block || "",
      unit: projectData.unit || "",
      zipCode: projectData.zipCode || "",
      province: projectData.province || "",
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      projectDescription: projectData.projectDescription || "",
      typeOfWork: projectData.typeOfWork || "",
      constructionType: projectData.constructionType || "",
      sections: projectData.sections || "",
      hiringCompany: projectData.hiringCompany || "",
      image: projectData.image || null,
      status: projectData.status || "noIniciado",
      reports: JSON.stringify([]),
      userId: userId,
    };

    projectObj = await removeUndefinedKeys(projectObj);
    let data = { ...projectObj, sections: JSON.stringify(projectObj.sections) };
    const result = await db.query(
      "INSERT INTO projects SET ?",
      data,
      "insert",
      conn
    );

    const projectId = result.insertId;

    return { message: "Project added successfully", projectId };
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

projectDao.getProject = async (projectId, userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM projects WHERE projectId = ? AND userId = ?",
      [projectId, userId],
      "select",
      conn
    );

    if (results.length) {
      try {
        results[0].reports = JSON.parse(results[0].reports);
      } catch (error) {
        results[0].reports = [];
      }
      return results[0];
    }
    return null;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

projectDao.getAllProjects = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM projects WHERE userId = ?",
      [userId],
      "select",
      conn
    );
    if (results.length) {
      return results || [];
    }
    return null;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

projectDao.updateProject = async (projectId, userId, data) => {
  let conn = null;
  try {
    const cleanData = await removeUndefinedKeys(data);

    if (cleanData.reports) {
      cleanData.reports = JSON.stringify(cleanData.reports);
    }

    conn = await db.createConnection();

    await db.query(
      "UPDATE projects SET ? WHERE projectId = ? AND userId = ?",
      [cleanData, parseInt(projectId), userId],
      "update",
      conn
    );
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

projectDao.deleteProject = async (projectId, userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    await db.query(
      "DELETE FROM projects WHERE projectId = ? AND userId = ?",
      [projectId, userId],
      "delete",
      conn
    );
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

// sections

projectDao.addSectionToProject = async (projectId, userId, newSection) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const project = await db.query(
      "SELECT sections FROM projects WHERE projectId = ? AND userId = ?",
      [projectId, userId],
      "select",
      conn
    );

    if (project.length) {
      let sections = [];
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

      try {
        // Verificar si sections es una cadena válida de JSON
        if (
          typeof project[0].sections === "string" &&
          project[0].sections.trim() !== ""
        ) {
          sections = JSON.parse(project[0].sections);
        }
      } catch (error) {
        console.error("Error parsing sections:", error.message);
        // Si falla el parseo, intentamos limpiar los corchetes y separar por comas
        let cleanedString = project[0].sections.replace(/[\[\]]/g, "");
        sections = cleanedString.split(",").map((section) => section.trim());
      }

      // Asegurarse de que las secciones por defecto estén presentes
      sections = [...new Set([...defaultSections, ...sections])];

      if (!sections.includes(newSection)) {
        sections.push(newSection);

        await db.query(
          "UPDATE projects SET sections = ? WHERE projectId = ? AND userId = ?",
          [JSON.stringify(sections), projectId, userId],
          "update",
          conn
        );
      }
    }
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

projectDao.updateSection = async (projectId, userId, newSection) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    await db.query(
      "UPDATE projects SET sections = ? WHERE projectId = ?",
      [JSON.stringify(newSection), projectId, userId],
      "update",
      conn
    );
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

projectDao.removeSectionFromProject = async (
  projectId,
  userId,
  sectionToRemove
) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const project = await db.query(
      "SELECT sections FROM projects WHERE projectId = ? AND userId = ?",
      [projectId, userId],
      "select",
      conn
    );

    if (project.length) {
      let sections = JSON.parse(project[0].sections || "[]");
      sections = sections.filter((section) => section !== sectionToRemove);
      await db.query(
        "UPDATE projects SET sections = ? WHERE projectId = ?",
        [JSON.stringify(sections), projectId, userId],
        "update",
        conn
      );
    }
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

projectDao.getSections = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();

    const sql = "SELECT * FROM sections ";

    return await db.query(sql, null, "select", conn);
  } catch (e) {
    console.error("Error during sections select: ", e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

// Reports

projectDao.uploadPDFReport = async (projectId, userId, reportData) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    const project = await db.query(
      "SELECT reports FROM projects WHERE projectId = ? AND userId = ?",
      [projectId, userId],
      "select",
      conn
    );

    if (!project || project.length === 0) {
      throw new Error("Proyecto no encontrado");
    }

    let reports = project[0].reports ? JSON.parse(project[0].reports) : [];
    reports.push(reportData);

    await db.query(
      "UPDATE projects SET reports = ? WHERE projectId = ? AND userId = ?",
      [JSON.stringify(reports), projectId, userId],
      "update",
      conn
    );

    return { message: "Reporte agregado con éxito", projectId };
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

projectDao.getAllReports = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT reports FROM projects WHERE userId=?",
      [userId],
      "select",
      conn
    );
  } catch (e) {
    console.error("Error al obtener las tareas desde Dao: ", e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

projectDao.deleteReport = async (projectId, userId, reportId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const project = await db.query(
      "SELECT reports FROM projects WHERE projectId = ? AND userId = ?",
      [projectId, userId],
      "select",
      conn
    );

    if (!project || project.length === 0) {
      throw new Error("Proyecto no encontrado");
    }

    const reports = project[0].reports ? JSON.parse(project[0].reports) : [];
    const updatedReports = reports.filter((report) => report.id !== reportId);

    return await db.query(
      "UPDATE projects SET reports = ? WHERE projectId = ? AND userId = ?",
      [
        JSON.stringify(updatedReports.length ? updatedReports : []),
        projectId,
        userId,
      ],
      "update",
      conn
    );
  } catch (e) {
    console.error("Error al eliminar el informe desde Dao: ", e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

module.exports = projectDao;

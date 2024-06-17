// aquí creao el Dao de proyectos incluida la sección de projects que sections que es un json ["kitchen", "livingRoom", "etc"]

const db = require("../db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");

const projectDao = {};

projectDao.addProject = async (projectData) => {
  let conn = null;
  try {
    console.log(projectData.sections, "projectData");
    conn = await db.createConnection();

    let projectObj = {
      projectName: projectData.projectName || "",
      identifier: projectData.identifier || "",
      addressDescription: projectData.addressDescription || "",
      address: projectData.address || "",
      block: projectData.block || "",
      unit: projectData.unit || "",
      zipCode: projectData.zipCode || "",
      province: projectData.province || "",
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      map: projectData.map || "",
      projectDescription: projectData.projectDescription || "",
      typeOfWork: projectData.typeOfWork || "",
      constructionType: projectData.constructionType || "",
      sections: projectData.sections || "",
      hiringCompany: projectData.hiringCompany || "",
      createTask: projectData.createTask || "",
      image: projectData.image || "",
      status: req.body.status || "noIniciado",
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

projectDao.getProject = async (projectId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM projects WHERE projectId = ?",
      [projectId],
      "select",
      conn
    );
    if (results.length) {
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

projectDao.getAllProjects = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM projects",
      null,
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

projectDao.updateProject = async (projectId, data) => {
  let conn = null;
  try {
    console.log("Data: ", data);

    if (data.sections) {
      data.sections = JSON.stringify(data.sections);
    }

    console.log("Data antes de remove", data);

    const cleanData = await removeUndefinedKeys(data);
    console.log("Clean data", cleanData);
    conn = await db.createConnection();

    await db.query(
      "UPDATE projects SET ? WHERE projectId = ?",
      [cleanData, parseInt(projectId)],
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

projectDao.deleteProject = async (projectId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    await db.query(
      "DELETE FROM projects WHERE projectId = ?",
      [projectId],
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

projectDao.addSectionToProject = async (projectId, newSection) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const project = await db.query(
      "SELECT sections FROM projects WHERE projectId = ?",
      [projectId],
      "select",
      conn
    );

    if (project.length) {
      let sections = JSON.parse(project[0].sections || "[]");
      if (!sections.includes(newSection)) {
        sections.push(newSection);
        await db.query(
          "UPDATE projects SET sections = ? WHERE projectId = ?",
          [JSON.stringify(sections), projectId],
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

projectDao.updateSection = async (projectId, sections) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    console.log("Sections before updating in DB:", sections);
    await db.query(
      "UPDATE projects SET sections = ? WHERE projectId = ?",
      [JSON.stringify(sections), projectId],
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

projectDao.removeSectionFromProject = async (projectId, sectionToRemove) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const project = await db.query(
      "SELECT sections FROM projects WHERE projectId = ?",
      [projectId],
      "select",
      conn
    );

    if (project.length) {
      let sections = JSON.parse(project[0].sections || "[]");
      sections = sections.filter((section) => section !== sectionToRemove);
      await db.query(
        "UPDATE projects SET sections = ? WHERE projectId = ?",
        [JSON.stringify(sections), projectId],
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

module.exports = projectDao;

// const db = require("../db");
// const moment = require("moment");
// const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");
// const sectionsDao = require("./sectionsDao");

// const projectDao = {};

// projectDao.addProject = async (projectData) => {
//     let conn = null;
//     try {
//         console.log(projectData.sections, "projectData");
//         conn = await db.createConnection();

//         let projectObj = {
//             projectName: projectData.projectName,
//             identifier: projectData.identifier,
//             addressDescription: projectData.addressDescription,
//             address: projectData.address,
//             block: projectData.block,
//             unit: projectData.unit,
//             zipCode: projectData.zipCode,
//             province: projectData.province,
//             startDate: moment().format("YYYY-MM-DD"),
//             endDate: moment().format("YYYY-MM-DD"),
//             map: projectData.map,
//             projectDescription: projectData.projectDescription,
//             typeOfWork: projectData.typeOfWork,
//             constructionType: projectData.constructionType,
//             sections: projectData.sections,
//             hiringCompany: projectData.hiringCompany,
//             createTask: projectData.createTask,
//         };

//         projectObj = await removeUndefinedKeys(projectObj);
//         let data = { ...projectObj, sections: JSON.stringify(projectObj.sections) };
//         const result = await db.query("INSERT INTO projects SET ?", data, "insert", conn);

//         // Assuming you need the projectId for some reason after insertion
//         const projectId = result.insertId;

//         return { message: 'Project added successfully', projectId };
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// projectDao.getProject = async (projectId) => {
//     let conn = null;
//     try {
//         conn = await db.createConnection();
//         const results = await db.query("SELECT * FROM projects WHERE projectId = ?", [projectId], "select", conn);
//         if (results.length) {
//             return results[0];
//         }
//         return null;
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// projectDao.getAllProjects = async () => {
//     let conn = null;
//     try {
//         conn = await db.createConnection();
//         const results = await db.query("SELECT * FROM projects",null, "select", conn);
//         if (results.length) {
//             return results || [];
//         }
//         return null;
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// projectDao.updateProject = async (projectId, data) => {
//     let conn = null;
//     try {
//         console.log('Data: ', data);

//         if (data.sections) {
//             data.sections = JSON.stringify(data.sections);
//         }

//         console.log('Data antes de remove', data);
//         const cleanData = await removeUndefinedKeys(data);
//         console.log('Clean data', cleanData);
//         conn = await db.createConnection();

//         await db.query("UPDATE projects SET ? WHERE projectId = ?", [cleanData, parseInt(projectId)], "update", conn);
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// projectDao.deleteProject = async (projectId) => {
//     let conn = null;
//     try {
//         conn = await db.createConnection();
//         await db.query("DELETE FROM projects WHERE projectId = ?", [projectId], "delete", conn);
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// projectDao.addSectionToProject = async (projectId, newSection) => {
//     let conn = null;
//     try {
//         conn = await db.createConnection();
//         const project = await db.query("SELECT sections FROM projects WHERE projectId = ?", [projectId], "select", conn);

//         if (project.length) {
//             let sections = JSON.parse(project[0].sections || "[]");
//             if (!sections.includes(newSection)) {
//                 sections.push(newSection);
//                 await db.query("UPDATE projects SET sections = ? WHERE projectId = ?", [JSON.stringify(sections), projectId], "update", conn);
//             }
//         }
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     } finally {
//         if (conn) await conn.end();
//     }
// };

// module.exports = projectDao;

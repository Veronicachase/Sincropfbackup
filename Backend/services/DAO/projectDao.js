
const db = require("../db")
const moment = require("moment");
const {removeUndefinedKeys} = require("../../utils/removeUndefinedkeys")
const projectDao = {};

projectDao.addProject = async (projectData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let projectObj = {
            projectName: projectData.projectName,
            addressDescription: projectData.addressDescription,
            address: projectData.address,
            block: projectData.block,
            portal: projectData.portal,
            unit: projectData.unit,
            zipCode: projectData.zipCode,
            province: projectData.province,
            startDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            endDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            map: projectData.map,
            projectDetails: projectData.projectDetails,
            typeOfWork: projectData.typeOfWork,
            constructionType: projectData.constructionType,
            projectId: projectData.projectId,
            sections: {
                livingRoom: projectData.livingRoom,
                kitchen: projectData.kitchen,
                hall: projectData.hall,
                room: projectData.room1,
                bathRoom: projectData.bathRoom,
                terrace: projectData.terrace,
                laundry: projectData.laundry,
                pool: projectData.pool,
                roof: projectData.roof,
                addedSection: projectData.addedSection,
            },
            hiringCompany: projectData.hiringCompany,
            createTask: projectData.createTask,
            area: projectData.area,
            projectDescription: projectData.projectDescription,
            taskDescription: projectData.taskDescription,
        };
        projectObj = await removeUndefinedKeys(projectObj);
        await db.query("INSERT INTO projects SET ?", projectObj, conn);
        return projectObj.projectId; 
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
        const results = await db.query("SELECT * FROM projects WHERE projectId = ?", [projectId], conn);
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

projectDao.updateProject = async (projectId, data) => {
    let conn = null;
    try {
      
        conn = await db.createConnection();
        const cleanData=removeUndefinedKeys(data)
        await db.query("UPDATE projects SET ? WHERE projectId = ?", [data, projectId], conn);
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
        await db.query("DELETE FROM projects WHERE projectId = ?", [projectId], conn);
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
        const sectionData = JSON.stringify(sections);
        await db.query("UPDATE projects SET sections = ? WHERE projectId = ?", [sectionData, projectId], conn);
    } catch (e) {
        console.error('Error al actualizar la sección:', e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

projectDao.addSection = async (projectId, newSection) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const results = await db.query("SELECT sections FROM projects WHERE projectId = ?", [projectId], conn);
        if (results.length) {
            let sectionkeys = JSON.parse(results[0].sections);
            sections = { ...sectionkeys, ...newSection }; 
            const updatedSections = JSON.stringify(sections);
            await db.query("UPDATE projects SET sections = ? WHERE projectId = ?", [updatedSections, projectId], conn);
        } else {
            throw new Error('Proyecto no encontrado');
        }
    } catch (e) {
        console.error('Error al agregar sección:', e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};






module.exports = projectDao;


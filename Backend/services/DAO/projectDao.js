
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
            livingRoom: projectData.livingRoom,
            kitchen: projectData.kitchen,
            hall: projectData.hall,
            room1: projectData.room1,
            room2: projectData.room2,
            bathRoom: projectData.bathRoom,
            terrace: projectData.terrace,
            laundry: projectData.laundry,
            pool:projectData.pool,
            addedSection: projectData.addedSection,
            identifier: projectData.identifier,
            hiringCompany: projectData.hiringCompany,
            createTask: projectData.createTask,
            area: projectData.area,
            projectDescription: projectData.projectDescription,
            image: projectData.image,
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

module.exports = projectDao;



const db = require("../db");
const moment = require("moment");
const {removeUndefinedKeys} = require("../../utils/removeUndefinedkeys")
const proyectoDao = {};

proyectoDao.addproyecto = async (proyectoData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let proyectoObj = {
            projectName: proyectoData.projectName,
            addressDescription: proyectoData.addressDescription,
            address: proyectoData.address,
            block: proyectoData.block,
            portal: proyectoData.portal,
            unit: proyectoData.unit,
            zipCode: proyectoData.zipCode,
            province: proyectoData.province,
            startDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            endDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            map: proyectoData.map,
            projectDetails: proyectoData.projectDetails,
            typeOfWork: proyectoData.typeOfWork,
            constructionType: proyectoData.constructionType,
            projectId: proyectoData.projectId,
            livingRoom: proyectoData.livingRoom,
            kitchen: proyectoData.kitchen,
            hall: proyectoData.hall,
            room1: proyectoData.room1,
            room2: proyectoData.room2,
            bathRoom: proyectoData.bathRoom,
            terrace: proyectoData.terrace,
            laundry: proyectoData.laundry,
            addedSection: proyectoData.addedSection,
            identifier: proyectoData.identifier,
            hiringCompany: proyectoData.hiringCompany,
            createTask: proyectoData.createTask,
            area: proyectoData.area,
            projectDescription: proyectoData.projectDescription,
            image: proyectoData.image,
            taskDescription: proyectoData.taskDescription,
        };
        proyectoObj = await removeUndefinedKeys(proyectoObj);
        await db.query("INSERT INTO projects SET ?", proyectoObj, conn);
        return proyectoObj.projectId; 
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};



proyectoDao.getProyecto = async (projectId) => {
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

proyectoDao.updateProyecto = async (projectId, data) => {
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

proyectoDao.deleteProyecto = async (projectId) => {
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

module.exports = proyectoDao;


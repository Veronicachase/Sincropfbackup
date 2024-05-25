
const db = require("../db")
const moment = require("moment");
const {removeUndefinedKeys} = require("../../utils/removeUndefinedkeys")
const projectDao = {};

projectDao.addProject = async (projectData) => {
    let conn = null;
    try {
        console.log(projectData.sections,"projectData")
        conn = await db.createConnection();
        let projectObj = {
            projectName: "test",
            identifier:projectData.identifier,
            addressDescription: projectData.addressDescription,
            address: projectData.address,
            block: projectData.block,
            unit: projectData.unit,
            zipCode: projectData.zipCode,
            province: projectData.province,
            startDate: moment().format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
            map: projectData.map,
            projectDescription: projectData.projectDescription,
            typeOfWork: projectData.typeOfWork,
            constructionType: projectData.constructionType,
            sections: {
                livingRoom: projectData.sections.livingRoom,
                kitchen: projectData.sections.kitchen,
                hall: projectData.sections.hall,
                room: projectData.sections.room,
                bathRoom: projectData.sections.bathRoom,
                terrace: projectData.sections.terrace,
                laundry: projectData.sections.laundry,
                pool: projectData.sections.pool,
                roof: projectData.sections.roof,   
            },
            
            hiringCompany: projectData.hiringCompany,
            createTask: projectData.createTask,            
        };

        projectObj = await removeUndefinedKeys( projectObj);
        let data = {...projectObj, sections: JSON.stringify(projectObj.sections)}
        return await db.query("INSERT INTO projects SET ?",  data,"insert", conn);
         
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
        const results = await db.query("SELECT * FROM projects WHERE projectId = ?", [projectId],"select", conn);
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
        const results = await db.query2("SELECT * FROM projects ", conn);
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

        console.log('Data: ', data)
        
        if (data.sections) {
            data.sections = JSON.stringify(data.sections);
        }

        console.log('Data antes de remove', data)
        const cleanData = await removeUndefinedKeys(data);
        console.log('Clean data', cleanData)
        conn = await db.createConnection();

        await db.query("UPDATE projects SET ? WHERE projectId = ?", [cleanData, parseInt(projectId)], "update", conn);
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
        await db.query("DELETE FROM projects WHERE projectId = ?",[projectId],"delete" ,  conn);
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
        await db.query("UPDATE projects SET sections = ? WHERE projectId = ?", [sectionData, projectId],"update", conn);
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
        const results = await db.query("SELECT sections FROM projects WHERE projectId = ?", [projectId],"select", conn);
        if (results.length) {
            let sectionkeys = JSON.parse(results[0].sections);
            sections = { ...sectionkeys, ...newSection }; 
            const updatedSections = JSON.stringify(sections);
            await db.query("UPDATE projects SET sections = ? WHERE projectId = ?", [updatedSections, projectId],"update", conn);
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


const db = require("../db");
const moment = require("moment");

const proyectoDao = {};

proyectoDao.addproyecto = async (proyectoData) => {
  let conn = null;

  try {
    conn = await db.createConnection();
    let proyectoObj = {
      projectName: proyectoData.projectName,
      addressDescription:proyectoData.addressDescription,
      address:proyectoData.address,
      block:proyectoData.block,
      portal:proyectoData.portal,
      unit:proyectoData.unit,
      zipCode:proyectoData.zipCode,
      province:proyectoData.province,
      startDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      endDate:  moment().format("YYYY-MM-DD HH:mm:ss"),
      map: proyectoData.map,
      projectDetails:proyectoData.projectDetails,
      typeOfWork:proyectoData.typeOfWork,
      constructionType: proyectoData.constructionType,
      projectId: proyectoData.projectId,
      livingRoom: proyectoData.livingRoom,
      kitchen: proyectoData.kitchen,
      hall:proyectoData.hall,
      room1: proyectoData.room1,
      room2:proyectoData.room2,
      bathRoom: proyectoData.bathRoom,
      terrace: proyectoData.terrace,
      laundry: proyectoData.laundry,
      addedSection:proyectoData.addedSection,
      identifier:proyectoData.identifier,
      hiringCompany:proyectoData.hiringCompany,
      createTask:proyectoData.createTask,
      area: proyectoData.area,
      projectDescription:proyectoData.projectDescription,
      image:proyectoData.image,
      taskDescription:proyectoData.taskDescription,
      
    };
    proyectoObj = await removeUndefinedKeys(proyectoObj);
    return await db.query("INSERT INTO projects SET ?", proyectoObj, "insert", conn);
  } catch (e) {
    console.log(e.message);
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};


proyectoDao.addProjectFile = async (fileData) => {
  // Conectamos con la base de datos y añadimos la información de la imagen.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del archivo a guardar en la base de datos.
    // Usamos la libreria momentjs para registrar la fecha actual.
    let fileObj = {
      name: fileData.name,
      path: fileData.path,
      projectId: fileData.projectId,
      registerDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    // Insertamos el registro
    return await db.query("INSERT INTO images SET ?", fileObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};


// proyectoDao.addProductsproyectos = async (rProdOrdData) => {
//   let conn = null;

//   try {
//     conn = await db.createConnection();

//     // let rProdOrdObj = {
//     //   idProduct: rProdOrdData.idProduct,
//     //   idproyecto: rProdOrdData.idproyecto,
//     // };

//     return await db.query(
//       "INSERT INTO projects SET ?",
//       rProdOrdObj,
//       "insert",
//       conn
//     );
//   } catch (e) {
//     console.log(e.message);
//     throw new Error(e);
//   } finally {
//     conn && (await conn.end());
//   }
// };

proyectoDao.updateProyecto = async (projectId) => {
  let conn = null;

  try {
    conn = await db.createConnection();
    return await db.query(
      "UPDATE projects SET ? WHERE id = ?",
      [projectId],
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

proyectoDao.getProyecto = async (projectId) => {
  let conn = null;

  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM projects where id= ?",
      projectId,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};
module.exports = proyectoDao;

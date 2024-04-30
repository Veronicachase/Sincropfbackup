const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");
const moment = require("moment");
const db = "traer de base de datos"

const trabajadorDao = {};

trabajadorDao.gettrabajadorByReference = async (reference) => {
  // Conectamos con la base de datos y buscamos si existe el trabajadoro por la referencia.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM employee WHERE reference = ?",
      reference,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

trabajadorDao.addtrabajador = async (trabajadorData) => {
  // Conectamos con la base de datos y añadimos el trabajadoro.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del trabajadoro a guardar en la base de datos.
    // Usamos la libreria momentjs para registrar la fecha actual.
    let trabajadorObj = {
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      name: trabajadorData.name,
      position: trabajadorData.position,
      project: trabajadorData.project,
      mandatoryEquipment: trabajadorData.mandatoryEquipment,
      comments: trabajadorData.comments
    };
    // Eliminamos los campos que no se van a registrar (no llegan por el body)
    trabajadorObj = await removeUndefinedKeys(trabajadorObj);
    // Insertamos el nuevo trabajadoro
    return await db.query(
      "INSERT INTO employess SET ?",
      trabajadorObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};


module.exports = trabajadorDao;

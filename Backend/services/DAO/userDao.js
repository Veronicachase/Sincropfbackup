const db = require("../db");
const moment = require("moment");
const md5 = require("md5");
const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");

const userDao = {};
userDao.getUserByEmail = async (email) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM users WHERE email = ?",
      email,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

// crear un nuevo usuario y a la vez creamos un proyecto por default,
//para que el usuario pueda hacer algunas de las transacciones sin haber
//creado un proyecto y como ejemplo.
userDao.addUser = async (userData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      name: userData.name,
      surname: userData.surname,
      company: userData.company,
      email: userData.email,
      password: md5(userData.password),
      updateDate: moment().format("YYYY-MM-DD"),
    };

    const userId  = await db.query(
      "INSERT INTO users SET ?",
      userObj,
      "insert",
      conn
    );

   
    console.log("UserId del usuario recien registrado",userId)

    const defaultProject = {
      projectName: "Default Project",
      addressDescription: "",
      block: "",
      unit: "",
      zipCode: null,
      province: "",
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      projectDescription: "Proyecto por defecto",
      typeOfWork: "construction",
      constructionType: "other",
      sections: JSON.stringify([
        "pool",
        "kitchen",
        "laundry",
        "roof",
        "room",
        "bathRoom",
        "hall",
        "livingRoom",
      ]),
      hiringCompany:"",
      image: "",
      status: "noIniciado",
      reports: JSON.stringify([]),
      userId: userId,
    };

    const projectResult = await db.query(
      "INSERT INTO projects SET ?",
      defaultProject,
      "insert",
      conn
    );
    console.log(projectResult);

    const projectId = projectResult.insertId;
    console.log(projectId);

    return { userId, projectId };
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};



userDao.getUserbyId = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM users WHERE userId = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userDao.deleteUser = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM users WHERE userId = ?",
      id,
      "delete",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userDao.updateUser = async (id, userData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: userData.password ? md5(userData.password) : undefined,
      updateDate: moment().format("YYYY-MM-DD"),
    };

    userObj = await removeUndefinedKeys(userObj);
    return await db.query(
      "UPDATE users SET ? WHERE userId = ?",
      [userObj, id],
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

module.exports = userDao;

const db = require("../db");
const moment = require("moment");
const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys");
const contactDao = {};

contactDao.addContact = async (contactData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    let contactObj = {
      contactName:contactData.contactName,
      category: contactData.category,
      company: contactData.company,
      address: contactData.address,
      email: contactData.email,
      phone: contactData.phone,
      mobile:contactData.mobile,
      comments: contactData.comments,
      userId: contactData.userId,
    };
    contactObj = await removeUndefinedKeys(contactObj);
    await db.query("INSERT INTO contacts SET ?", contactObj, "insert", conn);
    return contactObj.contactId;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

contactDao.getContactById = async (contactId, userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query(
      "SELECT * FROM contacts WHERE contactId = ? AND userId = ?",
      [contactId, userId],
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

contactDao.getAllContacts = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const results = await db.query("SELECT * FROM contacts WHERE userId = ?", [userId], "select", conn);
    if (results.length) {
      return results ;
    }
    return null;
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    if (conn) await conn.end();
  }
};

contactDao.updateContact = async (userId, contactId, data) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    const cleanData = removeUndefinedKeys(data);
    await db.query(
      "UPDATE contacts SET ? WHERE contactId = ? AND userId = ?",
      [cleanData, contactId, userId],
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

contactDao.deleteContact = async (userId, contactId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    await db.query(
      "DELETE FROM contacts WHERE contactId = ? AND userId = ?",
      [contactId, userId],
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

module.exports = contactDao;

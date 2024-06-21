
const db = require("../db")
const moment = require("moment");
const { removeUndefinedKeys } = require("../../utils/removeUndefinedkeys")
const orderDao = {};

orderDao.addOrder = async (orderData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let orderObj = {

            date: moment().format("YYYY-MM-DD"),
            orderId:orderData.orderId,
            productName: orderData.productName,
            providor: orderData.providor,
            brand: orderData.brand,
            amount: orderData.amount,
            details: orderData.details,
            typeOfWork:orderData.typeOfWork ,
            section: orderData.section,
            status:orderData.status,
            image:orderData.image,
            projectName:orderData.projectName   
        }
              
        orderObj = removeUndefinedKeys(orderObj);
        await db.query("INSERT INTO orders SET ?",   orderObj,"insert", conn);
        return orderObj.orderId; 
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

orderDao.getOrder = async (orderId) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const results = await db.query("SELECT * FROM orders WHERE orderId = ?", [orderId],"select", conn);
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

orderDao.getAllOrders = async () => {
    let conn = null;
    try {
        conn = await db.createConnection();
        const results = await db.query("SELECT * FROM orders ", null,"select" , conn);
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

orderDao.getAllOrdersByIdProject = async (projectId) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        
        const sql = `SELECT orders.* FROM orders 
                     JOIN projects ON orders.projectId = projects.projectId 
                     WHERE projects.projectId = ?`;
        const results = await db.query(sql, [projectId],"select", conn);

      
        return results.length ? results : [];
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};



orderDao.updateOrder = async (orderId, data) => {
    let conn = null;
    try {
      
        conn = await db.createConnection();
        const cleanData=removeUndefinedKeys(data)
        await db.query("UPDATE orders SET ? WHERE orderId = ?", [cleanData, orderId],"update", conn);
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};

orderDao.deleteOrder = async (orderId) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        await db.query("DELETE FROM orders WHERE orderId = ?",[orderId],"delete" ,  conn);
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        if (conn) await conn.end();
    }
};



module.exports = orderDao;


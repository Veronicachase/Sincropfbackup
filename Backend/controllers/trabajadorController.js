const trabajadorDao = require("../services/DAO/trabajadorDao");
const { jwtVerify } = require("jose");

const addtrabajador = async (req, res) => {
  //Obtenemos el token de autorizacion
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  const token = authorization.split(" ")[1];

  try {
    const enconder = new TextEncoder();
    const { payload } = await jwtVerify(
      token,
      enconder.encode(process.env.JWT_SECRET)
    );
    //construimos el objeto con los datos del pedido
    const trabajadorData = {
      idProduct: req.body.idProduct,
      idUser: payload.id,
      quantity: req.body.quantity,
    };

    const idtrabajador = await trabajadorDao.addtrabajador(trabajadorData);
    if (!idtrabajador) return res.sendStatus(500).send("Error al insertar pedido");

    const rProdOrdId = await trabajadorDao.addProductstrabajadors({
      idProduct: req.body.idProduct,
      idtrabajador,
    });

    if (!rProdOrdId)
      return res.sendStatus(500).send("Error al insertar rel_product_trabajador");

    const getTrabajador = await trabajadorDao.getTrabajador(req.body.trabajadorId);
    if (getTrabajador.length === 0)
      return res.status(404).send("no se encontro el producto");
    // [{name: 'product', price:100, stock:10}]

    // const productStock = getTrabajador[0].stock;

    // const newStock = productStock - req.body.quantity;
    const updateProductStock = await trabajadorDao.updateProductStock(
      newStock,
      req.body.idProduct
    );

    if (!updateProductStock)
      return res.sendStatus(500).send("Error al actualizar stock");

    return res.status(201).send(`Pedido Añadido con id ${idtrabajador}`);
  } catch (e) {
    console.log(e.message);
    throw new Error(e);
  }
};

module.exports = { addtrabajador };

const userDao = require("../services/DAO/userDao");
const { SignJWT, jwtVerify } = require("jose");
const md5 = require("md5");

const addUser = async (req, res) => {
  const { name, surname, company, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Error al recibir el body" });

  try {
    const user = await userDao.getUserByEmail(email);
    if (user.length > 0) return res.status(409).json("usuario ya registrado");

    const userId = await userDao.addUser(req.body);
    if (userId) return res.json(`Usuario ${name} con id: ${userId} registrado`);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Error al registrar el usuario" });
    throw new Error(e);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("Error al recibir el body");
  try {
    let user = await userDao.getUserByEmail(email);

    if (user.length <= 0)
      return res.status(404).json({ message: "usuario no registrado" });

    const clientPassword = md5(password);
    [user] = user;

    if (user.password !== clientPassword)
      return res.status(401).json({ message: "password incorrecta" });

    const jwtConstructor = new SignJWT({
      userId: user.userId,
      email: user.email,
    });

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(encoder.encode(process.env.JWT_SECRET));

    return res.send({ token: jwt, user });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error al iniciar sesión");
  }
};

const deleteUser = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  const token = authorization.split(" ")[1];
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );

    if (!payload.role)
      return res.status(409).send("no tiene permiso de administrador");

    const user = await userDao.getUserbyId(req.params.userId);
    if (user.length === 0) return res.status(404).send("el usuario no existe");

    await userDao.deleteUser(req.params.userId);
    return res.send(`Usuario con id ${req.params.userId} eliminado`);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error al eliminar usuario");
  }
};

const updateUser = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  try {
    if (Object.entries(req.body).length === 0)
      return res.status(400).json("Error al recibir el body");
    const userId = req.params.userId;
    const user = await userDao.getUserbyId(userId);
    if (user.length === 0) return res.status(404).json("el usuario no existe");

    const isUserUpdated = await userDao.updateUser(userId, req.body);
    if (!isUserUpdated)
      return res.status(500).json("Error al actualizar el usuario");

    return res.send(`Usuario con id ${userId} actualizado`);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error al actualizar usuario");
    throw new Error(e.message);
  }
};

const getUser = async (req, res) => {
  let user = await userDao.getUserbyId(req.params.userId);
  if (user.length === 0) return res.status(404).send("El usuario no existe");
  [user] = user;

  return res.send(user);
};

const logoutUser = async (req, res) => {
  res.status(200).send({ message: "Has salido de tu sesión" });
};

module.exports = {
  addUser,
  loginUser,
  deleteUser,
  updateUser,
  getUser,
  logoutUser,
};

// const userDao = require("../services/DAO/userDao");
// const { SignJWT, jwtVerify } = require("jose");
// const md5 = require("md5");

// const addUser = async (req, res) => {
//   const { name, surname, company, email, password } = req.body;
//   // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
//   if (!name || !email || !password)
//     return res.status(400).json({ message: "Error al recibir el body" });

//   // Buscamos el usuario en la base de datos
//   try {
//     const user = await userDao.getUserByEmail(email);
//     // Si existe el usuario respondemos con un 409 (conflict)
//     if (user.length > 0) return res.status(409).json("usuario ya registrado");
//     // Si no existe lo registramos
//     const userId = await userDao.addUser(req.body);
//     if (userId) return res.json(`Usuario ${name} con id: ${userId} registrado`);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: "Error al registrar el usuario" });
//     throw new Error(e);
//   }
// };

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res.status(400).send("Error al recibir el body");
//   try {
//     let user = await userDao.getUserByEmail(email);

//     if (user.length <= 0) return res.status(404).json({ message:"usuario no registrado"});

//     const clienPassword = md5(password);
//     // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
//     [user] = user;
//     // Si existe el usuario, comprobamos que la password es correcta. Si no lo es devolvemos un 401 (unathorized)
//     if (user.password != clienPassword)
//       return res.status(401).json({message:"password incorrecta"});

//     // Si es correcta generamos el token y lo devolvemos al cliente
//     // Construimos el JWT con el id, email y rol del usuario
//     const jwtConstructor = new SignJWT({
//      userId: user.userId,
//       email: user.email,
//       //role: user.userRole
//     });
//     // Codificamos el la clave secreta definida en la variable de entorno por requisito de la librería jose
//     // y poder pasarla en el formato correcto (uint8Array) en el método .sign
//     const encoder = new TextEncoder();

//     const jwt = await jwtConstructor
//       .setProtectedHeader({ alg: "HS256", typ: "JWT" })
//       .setIssuedAt()
//       .setExpirationTime("8h")
//       .sign(encoder.encode(process.env.JWT_SECRET));

//       res.cookie('token', jwt, {
//         httpOnly: true,
//         secure: false,
//         sameSite: 'strict',
//         maxAge: 8 * 60 * 60 * 1000
//       });

//     return res.send({token: jwt });
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// // Controlador para eliminar un usuario por su id // tengo que verificar si existe el admin (creo que no lo he creado aún)
// const deleteUser = async (req, res) => {
//   // OBTENER CABECERA Y COMPROBAR SU AUTENTICIDAD Y CADUCIDAD
//   const { authorization } = req.headers;
//   // Si no existe el token enviamos un 401 (unauthorized)
//   if (!authorization) return res.sendStatus(401);
//   const token = authorization.split(" ")[1];
//   try {
//     // codificamos la clave secreta
//     const encoder = new TextEncoder();
//     // verificamos el token con la función jwtVerify. Le pasamos el token y la clave secreta codificada
//     const { payload } = await jwtVerify(
//       token,
//       encoder.encode(process.env.JWT_SECRET)
//     );
//     // Verificamos que seamos usuario administrador
//     if (!payload.role)
//       return res.status(409).send("no tiene permiso de administrador");
//     // Buscamos si el id del usuario existe en la base de datos
//     const user = await userDao.getUserbyId(req.params.userId);
//     // Si no existe devolvemos un 404 (not found)
//     if (user.length === 0) return res.status(404).send("el usuario no existe");
//     // Si existe, eliminamos el usuario por el id
//     await userDao.deleteUser(req.params.userId);
//     // Devolvemos la respuesta
//     return res.send(`Usuario con id ${req.params.userId} eliminado`);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// const updateUser = async (req, res) => {
//   const { authorization } = req.headers;
//   // Si no existe el token enviamos un 401 (unauthorized)
//   if (!authorization) return res.sendStatus(401);
//   try {
//     // Si no nos llega ningún campo por el body devolvemos un 400 (bad request)
//     if (Object.entries(req.body).length === 0)
//       return res.status(400).json("Error al recibir el body");
//     const userId = req.params.userId;
//     // Buscamos si el id del usuario existe en la base de datos
//     const user = await userDao.getUserbyId(userId);
//     // Si no existe devolvemos un 404 (not found)
//     if (user.length === 0) return res.status(404).json("el usuario no existe");
//     // Actualizamos el usuario
//     const isUserUpdated = await userDao.updateUser(userId, req.body);
//     if (!isUserUpdated)
//       return res.status(500).json("Error al actualizar el usuario");

//     return res.send(`Usuario con id ${userId} actualizado`);
//   } catch (e) {
//     console.log(e.message);
//     throw new Error(e.message);
//   }
// }

// const getUser = async (req, res) => {
//   // Buscamos si el id del usuario existe en la base de datos
//   // let user = await userDao.getUserById(req.params.id);
//   let user= await userDao.getUserbyId(req.params.userId)
//   // Si no se encuentra el usuario, enviamos un 404 (not found)
//   if (user.length === 0) return res.status(404).send("El usuario no existe");
//   [user] = user;

//   return res.send(user);
// };

// const logoutUser = async (req, res) => {
// res.clearCookie('token')
// res.status(200).send({message: 'Has salido de tu sesión'})

// }

// module.exports = { addUser, loginUser, deleteUser, updateUser, getUser, logoutUser };

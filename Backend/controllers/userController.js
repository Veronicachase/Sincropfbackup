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
      .setExpirationTime("24h")
      .sign(encoder.encode(process.env.JWT_SECRET));

    return res.send({ token: jwt, user });
  } catch (e) {
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

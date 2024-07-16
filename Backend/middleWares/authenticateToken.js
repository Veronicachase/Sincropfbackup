const { jwtVerify } = require("jose");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Esto es lo que me viene del authenticationToken desde las cookies', token);

  if (!token) {
    console.log("No hay token, no ha llegado el token hasta el authenticateToken");
    return res.sendStatus(401); // No autorizado
  }

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(process.env.JWT_SECRET));
    console.log('esto es el payload', payload);
    req.user = payload;
    next();
  } catch (err) {
    console.log("JWT verification error:", err);
    return res.sendStatus(403); // Prohibido
  }
};

module.exports = authenticateToken;



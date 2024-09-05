const { jwtVerify } = require("jose");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // No autorizado
  }

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );

    req.user = payload;
    next();
  } catch (err) {
    return res.sendStatus(403); // Prohibido
  }
};

module.exports = authenticateToken;

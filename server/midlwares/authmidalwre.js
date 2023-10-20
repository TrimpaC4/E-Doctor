const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

const authProtection = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const user = await prisma.admins.findUnique({
        where: {
          id: decoded.adminId,
        },
      });

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).send("Not authorized");
      }
    } catch (error) {
      res.status(401).send("Not authorized");
    }
  }

  if (!token) {
    res.status(401).send("Not authorized, no token");
  }
};

module.exports = authProtection;

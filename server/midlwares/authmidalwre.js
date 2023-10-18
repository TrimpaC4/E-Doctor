const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

const authProtection = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Get User from the token
      const user = await prisma.admins.findUnique({
        where: {
          id: decoded.adminId, // Use the correct field for admin's ID
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

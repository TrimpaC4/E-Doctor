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
<<<<<<< HEAD
=======
      console.log(decoded)
      //Get User from the token
      if (decoded.PatientId) {
        req.user = await prisma.patients.findUnique( {where:{
          id: decoded.PatientId,
        },include:{appointments:{
          
        },reports:true,reviews:true}}
>>>>>>> 33953ec9e1867a614dab7d806e45c970a93da199

      const user = await prisma.admins.findUnique({
        where: {
          id: decoded.adminId,
        },
      });

      if (user) {
        req.user = user;
        next();
      } else {
<<<<<<< HEAD
        res.status(401).send("Not authorized");
=======
        req.user = await prisma.doctors.findUnique(

          {where:{
            id: decoded.DoctorId,
          },include:{appointments:{
            include: { patients:true
          
          }}
            ,reports:true,reviews:true}}
        
        ); 
>>>>>>> 33953ec9e1867a614dab7d806e45c970a93da199
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

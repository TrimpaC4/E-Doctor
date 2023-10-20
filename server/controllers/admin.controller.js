const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

<<<<<<< HEAD
exports.getAll = async (req, res) => {
  try {
    const getAllAdmins = await prisma.admins.findMany({});
    res.json(getAllAdmins);
  } catch (error) {
    throw error;
  }
};
exports.signup = async (req, res) => {
  try {
    const { adminName, password, avatarUrl } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admins.create({
      data: {
        adminName,
        password: hashedPassword,
        avatarUrl: avatarUrl
      },
    });

    const token = jwt.sign({ adminId: admin.id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Admin created", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.signin = async (req, res) => {
    try {
      const { adminName, password } = req.body;
  
      const admin = await prisma.admins.findFirst({
        where: {
          adminName,
        },
      });
  
      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign({ adminId: admin.id }, "your-secret-key", {
        expiresIn: "1h",
      });
  
      res.status(200).json({ message: "Sign-in successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }; 
=======
module.exports = {
    getAll: async (res, req) => {
        try {
            const getAdmin = await prisma.findMany(req.body);
            res.json(getAdmin)
        } catch (error) {
            throw error
        }
    },
    getOne: async (res, req) => {
        try {
            const getAdmin = await prisma.admins.findUnique(req.body);
            res.json(getAdmin)
        } catch (error) {
            throw error
        }
    },
   updatee : async (req, res) => {
        try {
            const result = await prisma.admins.update({ where: { id: req.params.id }, data:req.body })
            res.status(201).send(result)
        } catch (error) {
            throw new Error(error)
        }
    }
    

}
>>>>>>> 33953ec9e1867a614dab7d806e45c970a93da199

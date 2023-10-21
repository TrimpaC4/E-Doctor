const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op, where } = require("sequelize");
const prisma = require("../prisma");

module.exports.register = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10).then((hassedPass) => {
      prisma.doctors
        .create({
          data: {
            ...req.body,
            password: hassedPass,
          },
        })
        .then((result) =>
          res.status(201).json({
            message: "Doctor Created Successfully",
            result,
          })
        )
        .catch((error) => {
          res.status(500).send({
            message: "Error creating Doctor",
            error,
          });
        });
    });
  } catch (error) {
    res.status(500).send({
      message: "Password was not hashed successfully",
      error,
    });
  }
};

module.exports.login = async (req, res) => {
  prisma.doctors
    .findUnique({
      where: {
        email: req.body.email,
      },
    })
    .then((Doctor) => {
      bcrypt
        .compare(req.body.password, Doctor.password)
        .then((passChedk) => {
          if (!passChedk) {
            res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          const Token = jwt.sign(
            {
              DoctorId: Doctor.id,
              email: Doctor.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
          );
          res.status(200).json({
            message: "Login Successfull",
            DoctorId: Doctor.id,
            token: Token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(404).send({
        message: "Email not found",
        error,
      });
    });
};

module.exports.getAll = async (req, res) => {
  try {
    const result = await prisma.doctors.findMany({});
    res.status(201).send(result);
  } catch (error) {
    res.json(error);
  }
};
module.exports.getOne = async (req, res) => {
  res.status(200).send(req.user);
};


module.exports.deleteOne = async (req, res) => {
  try {
    const result = await prisma.doctors.delete({
      where: { id: +req.params.id },
    });
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports.updateOne = async (req, res) => {
  try {
    const result = await prisma.doctors.update({
      where: { id: +req.params.id },
      data: req.body,
    });
    res.status(201).send(result);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.verifyDoctor = async (req, res) => {
    try {
      const { isVerified } = req.body;
      const updatedDoctor = await prisma.doctors.update({
        where: { id: req.params.id },
        data: { isVerified },
      });
      res.status(200).json(updatedDoctor);
    } catch (error) {
      res.status(500).send({
        message: "Error updating doctor verification status",
        error,
      });
    }
  };






module.exports.getAvailableDoctors = async (req, res) => {
  try {
    const { department, time } = req.body;
    const response = await prisma.doctors.findMany({
      where: {
        department: department,
        schedule: {
          array_contains: time
            
          },
        },
      
    });
    const resp = response.filter((doctor) => doctor.schedule.includes(time));
    res.json(resp);
  } catch (error) {
    throw error
    res.json(error);
  }
};

module.exports.updateTimes = async (req, res) => {
  try {
    const doctor = await prisma.doctors.findUnique({
      where: { id: req.body.id },
    });
    const newsch = doctor.schedule.filter((sch) => sch !== req.body.time);
    const response = await prisma.doctors.findUnique({
      where: { id: req.body.id },
      data: { schedule: newsch },
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports.getByDepartment = async (req, res) => {
  try {
    console.log(req.body)
    const doctor = await prisma.doctors.findMany({
      where: {
        department:req.body.department,
        name: { contains: req.body.name },
      },
    });
    res.json(doctor);
  } catch (error) {
    throw error;
    res.json(error);
  }
};


module.exports.getAllFiltred = async (req, res) => {
  try {
    const result = await prisma.doctors.findMany({where:{department:req.params.depart}});
    res.status(201).send(result);
  } catch (error) {
    res.json(error);
  }
};

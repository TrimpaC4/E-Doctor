const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

module.exports.register = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10).then((hassedPass) => {
      prisma.patients
        .create({
          data: {
            ...req.body,
            password: hassedPass,
          },
        })
        .then((result) => {
          res.status(201).json({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({
            message: "Error creating User",
            error,
          });
        });
    });
  } catch (error) {
    throw error;
    res.status(500).send({
      message: "Password was not hashed successfully",
      error,
    });
  }
};

module.exports.login = async (req, res) => {
  prisma.patients
    .findUnique({
      where: {
        email: req.body.email,
      },
    })
    .then((Patient) => {
      bcrypt
        .compare(req.body.password, Patient.password)
        .then((passChedk) => {
          if (!passChedk) {
            res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          const Token = jwt.sign(
            {
              PatientId: Patient.id,
              email: Patient.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
          );
          res.status(200).json({
            message: "Login Successfull",
            PatientId: Patient.id,
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
    const result = await prisma.patients.findMany({
      //   include: {
      //     reports: true,
      //     appointments: {
      //         include: {
      //             doctors: true,
      //             rooms: true,
      //         },
      //     },
      //     messages: true,
      //     rooms: true,
      // },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports.getOne = async (req, res) => {
  res.status(200).send(req.user);
};
module.exports.remove = async (req, res) => {
  try {
    const patientId = req.params.id;
    console.log(patientId);
    const result = await prisma.patients.delete({
      where: { id: +patientId },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: " server error" });
  }
};

module.exports.Update = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.patients.update({
      where: { id: id },
      data: req.body,
    });
    res.json(result);
  } catch (error) {
    res.status(404).send(error);
  }
};
module.exports.UpdateBlock = async (req, res) => {
  try {
    const id = +req.params.id;
    const user = await prisma.patients.findUnique({ where: { id: id } });
    const result = await prisma.patients.update({
      where: { id: id },
      data: {
        isBlocked: !user.isBlocked,
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

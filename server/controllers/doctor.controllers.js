
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op, where } = require("sequelize");


module.exports.register = async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10)
            .then((hassedPass) => {
                Doctor.create({
                    ...req.body,
                    password: hassedPass
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
    Doctor.findOne({
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
                        token: Token
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
        const result = await Doctor.findAll({})
        res.status(201).send(result)
    } catch (error) {
        res.json(error)
    }
};
module.exports.getOne = async (req, res) => {
    res.status(200).send(req.user)

};
module.exports.deleteOne = async (req, res) => {
    try {
        const result = await Doctor.destroy({ where: { id: req.params.id } })
        res.json(result)
    } catch (error) {
        throw new Error(error)
    }
};
module.exports.updateOne = async (req, res) => {
    try {
        const result = await Doctor.update(req.body, { where: { id: req.params.id } })
        res.status(201).send(result)
    } catch (error) {
        throw new Error(error)
    }
};






module.exports.getAvailableDoctors = async (req, res) => {
    try {
        const { Department, Time } = req.body
        const response = await Doctor.findAll({ where: { department: { [Op.like]: Department } } })
        const resp = response.filter((doctor) => doctor.schedule.includes(Time))
        res.json(resp)
    } catch (error) {
        res.json(error)
    }

}

module.exports.updateTimes = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ where: { id: req.body.id } })
        const newsch = (doctor.schedule.filter((sch) => sch !== req.body.time));
        const response = await Doctor.update({ schedule: newsch }, { where: { id: req.body.id } })
        res.json(response)
    } catch (error) {
        res.json(error)
    }
}

module.exports.getByDepartment = async (req, res) => {
    try {
        const doctor = await Doctor.findAll({ where: { department: { [Op.like]: `%${req.body.department}%` }, name: { [Op.like]: `%${req.body.name}%` } } })
        res.json(doctor)
    } catch (error) {
        res.json(error)
    }
}
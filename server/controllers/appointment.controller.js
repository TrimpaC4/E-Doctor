const prisma = require("../prisma/prisma");


module.exports = {
  create: async (req, res) => {
    try {
      const respnse = await prisma.appointments.create({data:req.body});
      res.json(respnse);
    } catch (error) {
      res.json(error);
    }
  },
  update: async (req, res) => {
    try {
      const respnse = await prisma.appointments.update({
        where: { id: req.params.id },data:req.body
      });
      res.status(201).send(respnse);
    } catch (error) {
      res.json(error);
    }
  },
};

const prisma = require('../prisma')


module.exports.getAll = async (req, res) => {
    try {
      const result = await prisma.admins.findMany({
        include: { all: true, nested: true },
      });
      return  res.json(result)
    } catch (error) {
      return  res.status(404).send(error);
    }
  };

  module.exports.create = async (req,res) => {
    try {
        const result = await prisma.admins.create({data:req.body})
        res.json(result)
    } catch (error) {
        res.status(404).send(error)
    }
  }
  
  module.exports.getOne = async (req, res) => {
    try {
      const result = await prisma.admins.findUnique({ where: { id: req.params.id } });
      res.json(result);
    } catch (error) {
      res.status(404).send(error);
    } 
  };
  
  module.exports.remove = async (req, res) => {
    try {
      const result = await prisma.admins.delete({ where: { id: req.params.id } });
      res.json(result);
    } catch (error) {
      res.status(404).send(error);
    }
  };
  
  module.exports.update = async (req, res) => {
    const {isVerified} = req.body
    try {
      const result = await Doctor.update({where: { id: req.params.id },data:{isVerified:isVerified}});
      res.json(result);
    } catch (error) {
      res.status(404).send(error);
    }
  };
  
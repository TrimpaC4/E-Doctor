const prisma = require("../prisma");
module.exports.addMessage = async (req, res) => {
  try {
    const response = await prisma.messages.create({ data: req.body });
    res.json(response);
  } catch (error) {
    throw error;
  }
};
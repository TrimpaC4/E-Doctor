const prisma = require("../prisma");
module.exports.addReview = async (req, res) => {
  try {
    const toPost = await prisma.reviews.create({data:req.body});
    res.status(200).json(toPost);
  } catch (error) {
    throw error
    res.json(error);
  }
};

module.exports.getAllReview = async (req, res) => {
  try {
    const reviews = await prisma.reviews.findMany({
      where: { DoctorId: parseInt(req.params.docId) },
      include: { patients: true, doctors: true },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.json(error);
  }
};


module.exports.addReview = async (req, res) => {
    try {
        const toPost = await Review.create(req.body)
        res.status(200).json(toPost)
    } catch (error) {
        res.json(error)
    }
}

module.exports.getAllReview = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { DoctorId: req.params.docId }, include: { all: true } })
        res.status(200).json(reviews)
    } catch (error) {
        res.json(error)
    }
}



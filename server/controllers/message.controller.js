
module.exports.addMessage = async (req, res) => {
    try {
        const response = await Message.create(req.body)
        res.json(response)
    } catch (error) {
        res.json(error)
    }
}
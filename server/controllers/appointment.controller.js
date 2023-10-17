

module.exports = {
    create: async (req, res) => {
        try {
            const respnse = await Appointment.create(req.body)
            res.json(respnse);
        } catch (error) {
            res.json(error)
        }
    },
    update: async (req, res) => {
        try {
            const respnse = await Appointment.update(req.body, { where: { id: req.params.id } })
            res.status(201).send(respnse);
        } catch (error) {
            res.json(error)
        }
    }
}
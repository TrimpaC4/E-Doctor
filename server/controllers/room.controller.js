
module.exports.makeRoom = async (req, res) => {
    try {
        const aRoom = await Room.create(req.body)
        res.status(200).json(aRoom)
    } catch (error) {
        res.json(error)
    }
}

module.exports.getAllRoomsForPatient = async (req, res) => {
    try {
        const patRooms = await Room.findAll({ where: { PatientId: req.params.patId }, include: { all: true } })
        res.status(200).json(patRooms)
    } catch (error) {
        res.json(error)
    }
}
module.exports.getAllRoomsForDoctor = async (req, res) => {
    try {
        const docRooms = await Room.findAll({ where: { DoctorId: req.params.docId }, include: { all: true } })
        res.status(200).json(docRooms)
    } catch (error) {
        res.json(error)
    }
}
module.exports.getByRoomId = async (req, res) => {
    try {

        const docRooms = await Room.findOne({ where: { id: req.params.id }, include: { all: true } })
        res.status(200).json(docRooms)
    } catch (error) {
        res.json(error);
    }
}
const prisma = require("../prisma/prisma");

module.exports = {
    getAll: async (res, req) => {
        try {
            const getAdmin = await prisma.findMany(req.body);
            res.json(getAdmin)
        } catch (error) {
            throw error
        }
    },
    getOne: async (res, req) => {
        try {
            const getAdmin = await prisma.admins.findUnique(req.body);
            res.json(getAdmin)
        } catch (error) {
            throw error
        }
    },
   updatee : async (req, res) => {
        try {
            const result = await prisma.admins.update({ where: { id: req.params.id }, data:req.body })
            res.status(201).send(result)
        } catch (error) {
            throw new Error(error)
        }
    }
    

}
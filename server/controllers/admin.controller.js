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

    // addAdmin: async r
}
const { prisma } = require("../config/config");

exports.reportPerDay = async (req, res) => {
    try {
        const { dayStart, dayEnd } = req.body;

        let start = dayStart + "T00:00:00";
        let end = dayEnd + "T23:59:59.9"

        const result = await prisma.order.findMany({
            where: {
                create_date: {
                    gte: new Date(start),
                    lte: new Date(end),
                },
                NOT: {
                    status: "canceled"
                }
            }
        });

        res.send({ message: 'ok', result });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const cors = require("cors")
const PORT = process.env.PORT || 3000
const patientRouter = require("./routers/patient.router.js")
const doctorRouter = require("./routers/doctor.router.js")
const reviewRouter = require("./routers/review.router")
const roomRouter = require("./routers/room.router")
const appointmentRouter = require("./routers/appointementRouter.js")
const AdminDocRouter = require("./routers/admin.doc.router.js")
const messageRouter = require("./routers/message.Router")
const payment = require('./routers/payment.router')
// const EmailSender = require('./emailServer/EmailSender'); // Adjust the path to your EmailSender component

app.use(cors())

app.use(express.json())
app.use("/api/doctor/", doctorRouter);
app.use("/api/patient/", patientRouter);
app.use("/api/review", reviewRouter)
app.use("/api/room", roomRouter)
app.use("/api/appointment/", appointmentRouter)
app.use("/api/AdminDoc/", AdminDocRouter);
app.use("/api/message/",messageRouter)
app.use("/api/payment", payment)
// app.use(EmailSender); 

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});














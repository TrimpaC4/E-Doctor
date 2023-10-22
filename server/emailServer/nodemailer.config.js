// const nodemailer = require("nodemailer");

// const user = "aymenmakhlouf06@gmail.com";  
// const pass = "Aymen123123*"; 

// const transport = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: user,
//     pass: pass,
//   },
// });

// module.exports.sendConfirmationLocation = (email, randomCode) => {
//     transport
//       .sendMail({
//         from: user,
//         to: email,
//         subject: "Confirmation Location  ",
//         html: `
//         <div>
//         <h1> Get your Location in E-Doctor  </h1>
        
//           <p>Click on link to confirm your location in E-doctor map
//   </p>
//           <a href=http://localhost:3000/reset_password/${randomCode}>Cliquez ici
//   </a>
//   </div>`,
// })
// .catch((err) => console.log(err));
// };
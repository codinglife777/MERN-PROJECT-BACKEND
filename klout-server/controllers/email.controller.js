const nodusernameer = require("nodusernameer");
// username sender function
exports.sendusername = function (req, res) {
  // Definimos el transporter
  const transporter = nodusernameer.createTransport({
    service: "Gmail",
    auth: {
      user: "klout@gmail.com",
      pass: "Klout101$",
    },
  });
  // Definimos el username
  const mailOptions = {
    from: "Remitente",
    to: "destinatario@gmail.com",
    subject: "Asunto",
    text: "Contenido del username",
  };
  // Enviamos el username
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(500, err.message);
    } else {
      console.log("username sent");
      res.status(200).jsonp(req.body);
    }
  });
};

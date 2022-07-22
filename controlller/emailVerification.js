const nodemailer = require("nodemailer");

const User = require("../model/User");

module.exports = {
  async emailVefification(req, res) {
    let { email } = req.body;
    let user = await User.findOne({ email });

    // Create Transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    // Transportyer verify
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        // res.status(200).json(token);
        console.log(success);
      }
    });

    // Mail Options
    const mailOptions = {
      from: process.env.AUTH_EMAIL, // sender address
      to: email, // list of receivers
      subject: "Hello, Abu", // Subject line
      html: `<h4> Welcome to our Comunity</h4>
      <a href="http://localhost:3000/confirm/${user._id}" style="background : "#007bff"; color : "#fff " >Confirm Account</a>`,
    };
    // Send Email
    transporter
      .sendMail(mailOptions)
      .then(() => {
        res.send("Successfuly done!");
      })
      .catch((error) => {
        res.send("There was an problem!");
      });
  },
};

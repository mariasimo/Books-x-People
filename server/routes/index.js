require( 'dotenv' ).config()
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mailTemplate = require('../mailTemplate');

/* Nodemailer */
var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user:process.env.MAILUSER,
    pass:process.env.MAILPASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send-mail', function (req, res) {
  const tags = req.body.tags.map(tag=>" "+tag.name).join(",")
  const book=req.body

  var message = "Hi. Someone submitted a new book at Books x People"

  var mail = {
    from: "Books x People",
    to: process.env.MAILUSER,  //Change to email address that you want to receive messages on
    subject: 'Someone submitted a new book at Books x People',
    text: message,
    html: mailTemplate.templateNotification(book, tags),
  }
  
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err)
      res.json({
        msg: 'fail'
      })
    } else {
      console.log('success')
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;



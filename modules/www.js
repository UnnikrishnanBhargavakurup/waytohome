'use strict';

const nodemailer = require('nodemailer');

exports.home = function(req, res) {
  res.render('index');
};

exports.policy = function(req, res) {
  res.render('policy');
};

exports.contact_view = function(req, res) {
  res.render('contact');
};

exports.contact_submit = function(req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport({
    host: process.env.SMTP_URL,
    port:process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD 
    }
  });

  if(req.body.body === "") {
    //Mail options
    mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email, //grab form data from the request body object
      to: process.env.MAIL_TO,
      subject: 'Website contact form',
      text: req.body.message
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
      //email not sent
      if (error) {
        res.render('contact', {status: 'failed'});
      }
      else {
        res.render('contact', {status: 'success'});
      }
    });
  }
  else {
    res.render('contact', {msg: 'Error occured, message not sent.', err: true});
  }
};
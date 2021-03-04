const Users = require('../model/model');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport');
const helperFunc = require('../util/helperFunction')


const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
      api_key: helperFunc.apiKey() //gotten from the send grid.
    }
  }))

exports.getIndex = (req, res, next) => {
    res.render('index', { 
        pageTitle: 'Form Data',
    });
};

exports.postIndex = (req, res, next) => {
   const setUser = {
       id : new Date(),
       name : req.body.name,
       email: req.body.email,
       message: req.body.message
   }
   //send the email here
   Users.forms.push(setUser)
   transporter.sendMail({ 
    to: req.body.email, 
    from: helperFunc.myEmail(),   
    subject: 'Submission successful',   
    text: `thank you ${req.body.name} for submiting up`,
    html: `${req.body.message} ` 
  });
   res.redirect('/user')
};

exports.getUsers = (req, res, next) => {

    console.log(Users.getAll())
    res.render('userPage', { 
        pageTitle: 'User Info',
        users : Users.getAll()
    });
};










const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = { 
  register : function(req, res) {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
    
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
    
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    
    if (errors.length > 0) {
      res.send({
        errors,
      });
    } else {
        User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.send({
            errors,
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
            role: 'instructor'
          });
    
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
              .then(user => {
                jwt.sign({
                  id: newUser._id
                }, 
                process.env.EMAIL_SECRET,
                {
                  expiresIn: '1d'
                }, 
                (err, emailToken) => {
                  const url = `http://localhost:5000/users/confirmation/${emailToken}`;
                  req.transporter.sendMail({
                    from: "Educenter",
                    to: newUser.email,
                    subject: 'Educenter Confimation Email',
                    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                  })
                },
              );
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
            });
          });
        }
      });
    }  
  },
}
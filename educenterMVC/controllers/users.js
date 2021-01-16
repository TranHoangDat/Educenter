const User = require('../models/User');
const StudentCourse = require('../models/StudentCourse.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const StudentWishlist = require('../models/StudentWishlist');
require('dotenv').config();

module.exports = { 
  register : async function(req, res) {
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
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
        layout: 'layouts/usersLayout',
        title: 'Educenter Register'
      });
    } else {
        User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
            layout: 'layouts/usersLayout',
            title: 'Educenter Register'
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
            role: 'student'
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
                const newStudentWishlist = new StudentWishlist({
                  idStudent: newUser._id,
                  idCourse: []
                });
                newStudentWishlist.save();
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
  confirmation: async function(req, res) {
    try {
      const tokenInfo = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
      await User.updateOne(
        { _id: tokenInfo.id },
        { $set: { confirmed: true } }
      );
      const newStudentCourse = new StudentCourse({
        idStudent: tokenInfo.id,
        idCourse: []
      });
      newStudentCourse.save();
      return res.redirect('/');
    } catch (e) {
      req.flash('error', 'Sorry, your token expired!');
      res.render('confirm', { layout: 'layouts/usersLayout', title: 'Educenter Confirm' });
    }
  },
  confirm: async function(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        req.flash('error', 'Email is not registered');
        return res.redirect('/users/confirm');
      }
      jwt.sign({
        id: user._id
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
      });
    } catch (e) {
      console.log(e);
    }
  },
  login: function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          req.flash('error', 'Invalid email or password');
          return res.redirect('/users/login');
        }
        req.logIn(user, function(err) {
          if (err) {
              return next(err);
          }
          req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role, confirmed: user.confirmed };
          return res.redirect('/');
        });
    })(req, res, next);
  },
  logout: function(req, res) {
    req.logout();
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  }
}
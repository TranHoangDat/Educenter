const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StudentWishlist = require('../models/StudentWishlist.js');
require('dotenv').config();


module.exports = { 
    editEmail: async function(req, res) {
        const password = req.body.password;
        let isValidPassword = null;

        try {   
            isValidPassword = await bcrypt.compare(password, req.user.password);
        } catch(error) {
            return res.send({ result: 'failure', msg: 'Error occurred during processing!' }); 
        }

        if (!isValidPassword) {
            return res.send({ result: 'failure', msg: 'Wrong password!' }); 
        }

        const newEmail = req.body.newEmail;
        let isEmailExisted = null;

        try {
            isEmailExisted = await User.findOne({ email: newEmail });
        } catch(error) {
            return res.send({ result: 'failure', msg: 'Error occurred during processing!' }); 
        }
        
        if (isEmailExisted) {
            return res.send({ result: 'failure', msg: 'This email address is already registered!' }); 
        }
 
        try {
            await User.updateOne(
                { _id: req.user._id },
                { $set: { email: newEmail, confirmed: false } }
            );
        } catch (error) {
            return res.send({ result: 'failure', msg: 'Error occurred during processing!' }); 
        }

        jwt.sign({
            id: req.user._id
          }, 
          process.env.EMAIL_SECRET,
          {
            expiresIn: '1d'
          }, 
          (err, emailToken) => {
            const url = `http://localhost:5000/users/confirmation/${emailToken}`;
            req.transporter.sendMail({
              from: "Educenter",
              to: newEmail,
              subject: 'Educenter Confimation Email',
              html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
            });
          },
        );

        req.user.email = newEmail;
        return res.send({ result: 'success', msg: 'Your email address has been successfully changed! Please confirm your new email !' });
    },
    editName: async function(req, res) {
        const email = req.body.email;
        const newName = req.body.newName;

        try {
            await User.updateOne(
                { email: email },
                { $set: { name: newName } }
            );
        } catch {
            return res.send({ result: 'failure', msg: 'Error occurred during processing!' }); 
        }

        req.user.name = newName;
        return res.send({ result: 'success', msg: 'Your name has been successfully changed!' });
    },
    editPassword: async function(req, res) {
        const oldPassword = req.body.oldPassword;
        let isValidPassword = null;

        try {
            isValidPassword = await bcrypt.compare(oldPassword, req.user.password);
        } catch(error) {
            return res.send({ result: 'failure', msg: 'Error occurred during processing!' }); 
        }
        
        if (!isValidPassword) {
            return res.send({ result: 'failure', msg: 'Wrong password!' }); 
        }

        const newPassword = req.body.newPassword; 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, async (err, hashPassword) => {
              if (err) return res.status(406).send('failure');
              try {
                await User.updateOne(
                    { _id: req.user._id },
                    { $set: { password: hashPassword } }
                );
              } catch(error) {
                return res.send({ result: 'failure', msg: 'Error occurred during processing!' }); 
              }
            })
        });

        return res.send({ result: 'success', msg: 'Your password has been successfully changed!' });
    },
    addWishlist: async function(req, res) {
        try {
            await StudentWishlist.updateOne(
                { idStudent: req.user._id },
                { $push: { idCourse: req.params.courseId } }
            );
            return res.send('success');
        } catch(error) {
            return res.send('failure'); 
        }
    },
    removeWishlist: async function(req, res) {
        try {
            await StudentWishlist.updateOne(
                { idStudent: req.user._id },
                { $pull: { idCourse: { $in: [req.params.courseId] } } }
            );
            return res.send('success');
        } catch(error) {
            return res.send('failure'); 
        }
    },
}
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

module.exports = { 
    editEmail: async function(req, res) {
        const oldEmail = req.body.oldEmail;
        const password = req.body.password;
        let user = null;
        let isValidPassword = null;

        try {   
            user = await User.findOne({ email: oldEmail });
            isValidPassword = await bcrypt.compare(password, user.password);
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
                { _id: user._id },
                { $set: { email: newEmail } }
            );
        } catch (error) {
            return res.send({ result: 'failure', msg: 'Error occurred during processing!' }); 
        }
        
        req.user.email = newEmail;
        return res.send({ result: 'success', msg: 'Your email address has been successfully changed!' });
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
        const email = req.body.email;
        const oldPassword = req.body.oldPassword;
        let user = null;
        let isValidPassword = null;

        try {
            user = await User.findOne({ email: email });
            isValidPassword = await bcrypt.compare(oldPassword, user.password);
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
                    { _id: user._id },
                    { $set: { password: hashPassword } }
                );
              } catch(error) {
                return res.send({ result: 'failure', msg: 'Error occurred during processing!' }); 
              }
            })
        });

        return res.send({ result: 'success', msg: 'Your password has been successfully changed!' });
    }
}
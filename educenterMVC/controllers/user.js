const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

module.exports = { 
    editEmail: async function(req, res) {
        const oldEmail = req.body.oldEmail;
        const password = req.body.password;
        const user = await User.findOne({ email: oldEmail });

        if (!user.confirmed) {
            // return
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            req.flash('error', 'Wrong Password!');
            return res.render('/user/edit-account'); 
        }

        const newEmail = req.body.newEmail; 
        await User.updateOne(
            { _id: user._id },
            { $set: { email: newEmail } }
        );
        req.flash(
            'success_msg',
            'You changes has been successfully saved'
        );
        req.session.user = { id: user._id, name: user.name, email: user.newEmail, role: user.role, confirmed: user.confirmed };
        return res.render('/user/edit-account');
    },
    editName: async function(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const user = User.findOne({ email: email });
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            req.flash('error', 'Wrong Password!');
            return res.render('/user/edit-account'); 
        }
        const newName = req.body.newName; 
        await User.updateOne(
            { _id: user._id },
            { $set: { name: newName } }
        );
        req.flash(
            'success_msg',
            'You changes has been successfully saved'
        );
        return res.render('/user/edit-account');
    },
    editPassword: async function(req, res) {
        const email = req.body.email;
        const oldPassword = req.body.oldPassword;
        const user = User.findOne({ email: email });
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            req.flash('error', 'Wrong Old Password!');
            return res.render('/user/edit-account'); 
        }
        const newPassword = req.body.newPassword; 
        await User.updateOne(
            { _id: user._id },
            { $set: { password: newPassword } }
        );
        req.flash(
            'success_msg',
            'You changes has been successfully saved'
        );
        return res.render('/user/edit-account');
    }
}
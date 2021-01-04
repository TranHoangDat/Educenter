module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      if (!req.user.confirmed) {
        req.flash('error_msg', 'Confirm your email to view that resource');
        res.redirect('/users/confirm');
      } else {
        return next();
      }
    } else {
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    } 
    
  },
  // forwardAuthenticated: function(req, res, next) {
  //   if (!req.isAuthenticated()) {
  //     return next();
  //   }
  //   res.redirect('/dashboard');      
  // }
};

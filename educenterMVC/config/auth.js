module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated() && (req.user.confirmed)) {
      return next();
    }

    if (!req.isAuthenticated()) {
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    } 
    
    if (!req.user.confirmed) {
      req.flash('error_msg', 'Please confirm your email to view that resource');
      res.redirect('/users/confirm');
    }
  },
  // forwardAuthenticated: function(req, res, next) {
  //   if (!req.isAuthenticated()) {
  //     return next();
  //   }
  //   res.redirect('/dashboard');      
  // }
};

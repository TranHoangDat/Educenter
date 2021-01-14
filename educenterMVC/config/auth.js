const CoursePrototype = require('../models/CoursePrototype');

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('error_msg', 'Please log in to view that resource');
      return res.redirect('/users/login');
    } 
  },
  instructorAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.confirmed) {
        if (req.user.role === 'instructor') {
          return next();
        }
        return res.redirect('/'); //
      } else {
        req.flash('error_msg', 'Please confirm your email to view that resource');
        return res.redirect('/users/confirm');
      }
    } else {
      req.flash('error_msg', 'Please log in to view that resource');
      return res.redirect('/users/login');
    }
  },
  manageCourseAuth: async function(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.confirmed) {

        if (req.user.role === 'instructor') {
          let isInstructorOfCourse = null;
          let course = null;

          try {
            course = await CoursePrototype.findOne({
              _id: req.params.courseId,
            });

            const instructorId = req.user._id.toString();

            isInstructorOfCourse = await course.idInstructors.find(function(idInstructor) {
              return idInstructor === instructorId;
            });

          } catch(error) {
            console.log(error);
          }
          
          if (isInstructorOfCourse) {
            req.courseTitle = course.title;
            req.courseStatus = course.status;
            req.courseId = course._id;
            return next();
          } else {
            return res.redirect('/'); //
          }

        } 

        return res.redirect('/'); //
      } else {
        req.flash('error_msg', 'Please confirm your email to view that resource');
        return res.redirect('/users/confirm');
      }
    } else {
      req.flash('error_msg', 'Please log in to view that resource');
      return res.redirect('/users/login');
    }
  }
  // forwardAuthenticated: function(req, res, next) {
  //   if (!req.isAuthenticated()) {
  //     return next();
  //   }
  //   res.redirect('/dashboard');      
  // }
};

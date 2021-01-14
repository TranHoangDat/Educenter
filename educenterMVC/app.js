const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const CourseInfo = require('./models/CourseInfo');


const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('view options', { layout:'layouts/layout.ejs' });

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
    secret: 'educenter',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/about', require('./routes/about.js'));
app.use('/courses', require('./routes/courses.js'));
app.use('/events', require('./routes/events.js'));
app.use('/blog', require('./routes/blog.js'));
app.use('/users', require('./routes/users.js'));
app.use('/instructors', require('./routes/instructors.js'));
app.use('/user', require('./routes/user.js'));
app.use('/home', require('./routes/home.js'));
app.use('/my-courses', require('./routes/myCourses.js'));
app.use('/course', require('./routes/course.js'));
app.use('/instructor', require('./routes/instructor.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));


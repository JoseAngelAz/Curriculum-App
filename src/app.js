require('./config/config');
require('./config/passport');
require('./database/database');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const app = express();

//linking viewFiles with src
app.set('views',path.join(__dirname,'views'));

app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    handlebars:allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine','.hbs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//session module
app.use(session({
    secret:'myCurriculumApp',
    resave:true,
    saveUninitialized:true
}));

//passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

//to send flash messages
app.use(flash());

//Global Variables
app.use((req,res,next)=>{
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
res.locals.user = req.user||null;
next();
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/Curriculum'));
app.use(require('./routes/EjemploCV'));
//routing css
app.use(express.static(path.join(__dirname,'public')));

//settings server
app.set('port', process.env.PORT||3005);

module.exports = app;
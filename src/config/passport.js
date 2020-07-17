const passport = require('passport');
const User = require('../models/User.model');

//defining strategy
const LocalStrategy = require('passport-local').Strategy;

//params to auth the user
passport.use(new LocalStrategy({
    usernameField:'email'
},async(email,password,done)=>{
    const user = await User.findOne({email:email});
    if (!user) {
        return done(null,false,{message:'Not User Found.'});
    }else{
        console.log(user);
        const match = await user.matchPass(password);
        if (match) {
            console.log(user.password);
            return done(null,user);
        }else{
            return done(null,false,
                {message:'Incorrect Password'});
        }
    }
}));

//save the user'session in ID
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//the reverse
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});
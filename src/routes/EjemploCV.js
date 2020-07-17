const express = require('express');
const router = express.Router();
const Curriculum = require('../models/Curriculum.model');
const {isAuthenticated} = require('../config/auth.config')


//Read Curri
router.get('/viewCurriculum',isAuthenticated,(req,res)=>{
const curris = Curriculum.findById({user:req.params.id}).sort('desc').lean();
res.render('partials/curri',{curris});
});

module.exports = router;
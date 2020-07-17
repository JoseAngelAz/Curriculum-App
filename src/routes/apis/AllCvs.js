const express = require('express');
const router = express.Router();
const AllCvs = require('../../models/Curriculum.model');

//ver todos los cv en json
router.get('/viewAllCvs', async(req,res)=>{
  const Curriculums = await AllCvs.find();
  res.json(Curriculums);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Curriculum = require('../models/Curriculum.model');
const {isAuthenticated} = require('../config/auth.config');
//gen Pdf modules required
const fs = require('fs');
const carbone = require('carbone');
const objetoPdf = require('../templates/template.json');
const { json } = require('express');

router.get('/add-newCurriculum',isAuthenticated,(req,res)=>{
    res.render('curriculums/new-Cv')
    req.flash('error_msg','Something was Wrong');
});

router.post('/add-newCurriculum',isAuthenticated,async(req,res)=>{
    const  {
      nombre,  
      direccion,
      telefono,
      email,
      pag_web,
      vocacion,
      voca_descript,
      exp_laboral_nombre,
      exp_laboral_descript,
      educacion_nombre,
      lugar_educacion,
      curso_name,
      curso_descript,
      red_uno,
      red_dos,
      red_tres,
      red_cuatro,
      nombre_ref_uno,
      numero_ref_uno,
      email_ref_uno,
      nombre_ref_dos,
      numero_ref_dos,
      email_ref_dos
    } = req.body;
    const cagadas = [];
    
    //VALIDAR INPUTS PRIMERO!!!
    if (!vocacion) {
      cagadas.push({text:'Por favor llena el campo vocación'});
  }
  if (!nombre) {
    //cagadas.push({text:'Por favor llena el campo nombre'});
    setTimeout(()=>{cagadas.push({text:'Por favor llena el campo nombre'});},3000)
  }
  if (!voca_descript) {
      cagadas.push({text:'Por favor llena la descrión de la vocación'});
  }
  if (!exp_laboral_nombre) {
      cagadas.push({text:'Por favor llena el campo de exp laboral'});
  }
  if (!exp_laboral_descript) {
      cagadas.push({text:'Por favor llena el campo descripción exp laboral'});
  }
  if (!educacion_nombre) {
      cagadas.push({text:'Por favor llena el campo Educación nombre'});
  }
  if (!lugar_educacion) {
      cagadas.push({text:'Por favor llena el campo Educación lugar'});
  }
  if (!curso_name) {
      cagadas.push({text:'Por favor llena el campo Nombre del Curso'});
  }
  if (!curso_descript) {
      cagadas.push({text:'Por favor llena el campo descripción del curso'});
  }
  if (!telefono) {
      cagadas.push({text:'Por favor llena el campo Teléfono'});
  }
  if (!direccion) {
      cagadas.push({text:'Por favor llena el campo dirección'});
  }
  if (!email) {
      cagadas.push({text:'Por favor llena el campo Email'});
  }
  if (!pag_web) {
      cagadas.push({text:'Por favor llena el campo Página Web'});
  }
  if (!red_uno) {
      cagadas.push({text:'Por favor llena el campo Red social uno'});
  }
  if (!red_dos) {
      cagadas.push({text:'Por favor llena el campo Red social dos'});
  }
  if (!red_tres) {
      cagadas.push({text:'Por favor llena el campo Red social tres'});
  }
  if (!red_cuatro) {
      cagadas.push({text:'Por favor llena el campo Red social cuatro'});
  }
  if (!nombre_ref_uno) {
      cagadas.push({text:'Por favor llena el Nombre de tu primera referencia'});
  }
  if (!numero_ref_uno) {
      cagadas.push({text:'Por favor llena el campo número de tu primera referencia'});
  }
  if (!email_ref_uno) {
      cagadas.push({text:'Por favor llena el campo email referencia uno'});
  }
  
  if (!nombre_ref_dos) {
      cagadas.push({text:'Por favor llena el Nombre de tu segunda referencia'});
  }
  if (!numero_ref_dos) {
      cagadas.push({text:'Por favor llena el campo número de tu segunda referencia'});
  }
  if (!email_ref_dos) {
      cagadas.push({text:'Por favor llena el campo email referencia dos'});
  }
    
    if (cagadas.length > 0) {
        console.log('Los campos vacios fueron :',cagadas.length);
        res.render('curriculums/new-Cv', {
            cagadas,
            nombre,  
            direccion,
            telefono,
            email,
            pag_web,
            vocacion,
            voca_descript,
            exp_laboral_nombre,
            exp_laboral_descript,
            educacion_nombre,
            lugar_educacion,
            curso_name,
            curso_descript,
            red_uno,
            red_dos,
            red_tres,
            red_cuatro,
            nombre_ref_uno,
            numero_ref_uno,
            email_ref_uno,
            nombre_ref_dos,
            numero_ref_dos,
            email_ref_dos
        });
    }else{
        const newCV = new Curriculum({
            nombre,  
            direccion,
            telefono,
            email,
            pag_web,
            vocacion,
            voca_descript,
            exp_laboral_nombre,
            exp_laboral_descript,
            educacion_nombre,
            lugar_educacion,
            curso_name,
            curso_descript,
            red_uno,
            red_dos,
            red_tres,
            red_cuatro,
            nombre_ref_uno,
            numero_ref_uno,
            email_ref_uno,
            nombre_ref_dos,
            numero_ref_dos,
            email_ref_dos
        });
      newCV.user = req.user.id;
      await newCV.save();
      req.flash('success_msg','CV CURRICULUM Agregado correctamente');
      res.redirect('/CurriculumsVitae')
    }
  
  });

//Read Curriculums
router.get('/CurriculumsVitae',isAuthenticated,async(req,res)=>{
    const curri = await Curriculum.find({user:req.user.id}).sort({date:'desc'}).lean();
    res.render('curriculums/all-cv',{curri});
});

//Read sheet
router.get('/ReadCurriculum/:id',isAuthenticated,async(req,res)=>{
    const curri = await Curriculum.findById(req.params.id).lean();
    res.render('curriculums/sheetCurriculum',{curri});
});

//EDIT
router.get('/Curriculums/Edit-Cv/:id',isAuthenticated,async(req,res)=>{
    const curri = await Curriculum.findById(req.params.id).lean();
    res.render('curriculums/edit-Cv',{curri});
});

router.put('/Curriculums/Edit-Cv/:id',isAuthenticated,async(req,res)=>{
    const {
        nombre,  
      direccion,
      telefono,
      email,
      pag_web,
      vocacion,
      voca_descript,
      exp_laboral_nombre,
      exp_laboral_descript,
      educacion_nombre,
      lugar_educacion,
      curso_name,
      curso_descript,
      red_uno,
      red_dos,
      red_tres,
      red_cuatro,
      nombre_ref_uno,
      numero_ref_uno,
      email_ref_uno,
      nombre_ref_dos,
      numero_ref_dos,
      email_ref_dos
    }=req.body;
    await Curriculum.findByIdAndUpdate(req.params.id,{
        nombre,  
      direccion,
      telefono,
      email,
      pag_web,
      vocacion,
      voca_descript,
      exp_laboral_nombre,
      exp_laboral_descript,
      educacion_nombre,
      lugar_educacion,
      curso_name,
      curso_descript,
      red_uno,
      red_dos,
      red_tres,
      red_cuatro,
      nombre_ref_uno,
      numero_ref_uno,
      email_ref_uno,
      nombre_ref_dos,
      numero_ref_dos,
      email_ref_dos
    });
    req.flash('success_msg','Curriculum Updated Successfully');
    res.render('/all-cv');
});

//DELETE
router.delete('/Curriculums/Delete/:id',isAuthenticated,async(req,res)=>{
    await Curriculum.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Curriculum Vitae Deleted Successfully');
    res.redirect('/all-cv');
});

//Gen PDF
router.post('/ReadCurriculum/:id',isAuthenticated, async(req,res)=>{

    const CvJson = json( Curriculum.findById(req.params.id));

    const options = {
        converTo:'pdf'//puede ser docx, txt, ...
    }
               
    carbone.render('./src/templates/template.odt',CvJson,options,(err,result)=>{
        if (err) {
            return console.log('Algo salio mal: ', err);
        }
        
        //escribir resultado
        fs.writeFileSync('./result.odt',result);
        res.redirect('/all-cv');
        process.exit();
        
    }); 
    
});

module.exports = router;
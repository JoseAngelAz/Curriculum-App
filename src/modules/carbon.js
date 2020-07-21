CarboneCtrl = {}
const fs = require('fs');
const carbone = require('carbone');
const db = require('../models/Curriculum.model');
const express = require('express');
const router = express.Router();
const arreglo =[];
arreglo.push(db);

        var data = {
            firstname:'Angel',
            lastname:'Azucena',
            age:'27'
        };
        var options = {
            convertTo : 'pdf' //can be docx, txt, ...
          };
        

//Genera un reporte usando la plantilla de ejemplo provista por el modulo carbone
//Este LibreOffice contiene "hello {d.firstname} {d.lastname} !"
//por supuesto, tu puedes crear tus propias plantillas.
CarboneCtrl.POST_PDF_NEW = async (req,res)=>{
    carbone.render('./src/templates/template.odt',data,options,(err,result)=>{
        if (err) {
            console.log('ha habido un error: ', err);
        }
              fs.writeFileSync('./src/descargasPDF/resultado2.pdf', result);
              process.exit();
        
       });      
}

CarboneCtrl.GET_DOWNLOADPDF = async ()=>{
    router.get('/bajarpdf',(req,res)=>{
        const pdf_doc = __dirname + './src/descargasPDF/resultado2.odt';
        res.download(pdf_doc);
    });
    console.log('Metodo GET_DOWNLOADPDF ejecutado.');
}

module.exports = CarboneCtrl;
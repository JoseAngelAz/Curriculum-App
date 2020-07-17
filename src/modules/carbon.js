const fs = require('fs');
const carbone = require('carbone');

var data = {
    firstname:'Angel',
    lastname:'Azucena',
    age:'27'
};

//Genera un reporte usando la plantilla de ejemplo provista por el modulo carbone
//Este LibreOffice contiene "hello {d.firstname} {d.lastname} !"
//por supuesto, tu puedes crear tus propias plantillas.

carbone.render('../templates/templateOne.odt',data,function(err,result){
    if (err) {
        return console.log(err);
    }
    //escribe el resultado
    fs.writeFileSync('result.odt',result);
});
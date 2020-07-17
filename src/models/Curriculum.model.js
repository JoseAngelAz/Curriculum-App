const mongoose = require('mongoose');
const {Schema} = mongoose; 


const CurriculumSchema = new Schema({
    user:{type:String},
    imagePath: { type: String, required: false },
    licencia: { type: String, required: false },
    dui: { type: String, required: false },
    nit: { type: String, required: false },
    nombre: { type: String, required: false },
    edad: { type: String, required: false },
    direccion: { type: String, required: false },
    telefono: { type: String, required: false },
    email: { type: String, required: false },
    pag_web: { type: String, required: false }, //fin de datos personales
    vocacion: { type: String, required: false },
    voca_descript: { type: String, required: false },
    exp_laboral_fechaInicio: { type: Date, default: Date.now(), required: false },
    exp_laboral_fechaFinal: { type: Date, default: Date.now(), required: false },
    exp_laboral_nombre: { type: String, required: false },
    exp_laboral_descript: { type: String, required: false }, //fin de exp laboral
    educacion_fechaInicio: { type: Date, default: Date.now(), required: false },
    educacion_fechaFinal: { type: Date, default: Date.now(), required: false },
    educacion_nombre: { type: String, required: false },
    lugar_educacion: { type: String, required: false },
    educacion_descript: { type: String, required: false }, //fin de educacion
    cursos_fechaInicio: { type: Date, default: Date.now(), required: false },
    cursos_fechaFinal: { type: Date, default: Date.now(), required: false },
    curso_name: { type: String, required: false },
    curso_descript: { type: String, required: false }, //fin de cursos
    red_uno: { type: String, required: false, default: "in" },
    red_dos: { type: String, required: false, default: "facebook" },
    red_tres: { type: String, required: false, default: "tweeter" },
    red_cuatro: { type: String, required: false, default: "github" }, //fin de redes sociales
    html: { type: String, required: false },
    css: { type: String, required: false },
    javascript: { type: String, required: false },
    java: { type: String, required: false },
    figma: { type: String, required: false },
    ilustrator: { type: String, required: false },
    nodejs: { type: String, required: false }, //fin de skills
    nombre_ref_uno: { type: String, required: false },
    numero_ref_uno: { type: String, required: false },
    email_ref_uno: { type: String, required: false },
    nombre_ref_dos: { type: String, required: false },
    numero_ref_dos: { type: String, required: false },
    email_ref_dos: { type: String, required: false }, //fin de ref personals
    tipo_usuario: { type: String, required: false, default: "USER" }
  });

  module.exports = mongoose.model('CurriculumTemplate',CurriculumSchema);
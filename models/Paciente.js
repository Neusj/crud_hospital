const mongoose = require('mongoose');

const Paciente = mongoose.model('Paciente', {
  rut: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  sexo: {
    type: String,
    required: true
  },
  fotoPersonal: {
    type: String,
    required: false 
  },
  fechaIngreso: {
    type: Date,
    default: Date.now 
  },
  enfermedad: {
    type: String,
    required: true
  },
  revisado: {
    type: Boolean,
    default: false
  }
});

module.exports = Paciente;

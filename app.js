const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const pacienteController = require('./controllers/pacienteController');
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/dbhospital');

const conn = mongoose.connection;

conn.once('open', () =>{
    console.log('Conexión exitosa');
});

conn.on('error', (err) =>{
    console.log('Error de conexión ', errr);
});

app.get('/getAll', pacienteController.getAllPacientes);
app.get('/getById/:id', pacienteController.getPacienteById);
app.get('/getCustom', pacienteController.getCustomPacientes);
app.post('/add', pacienteController.addPaciente);
app.put('/update/:id', pacienteController.updatePaciente);
app.delete('/delete/:id', pacienteController.deletePaciente);

app.listen(3000, () => {
    console.log('Servidor listo...');
});
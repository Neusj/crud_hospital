
const Paciente = require('../models/Paciente');

exports.getAllPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();

        res.json(pacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pacientes' });
    }
};

exports.getPacienteById = async (req, res) => {
    const pacienteId = req.params.id;

    try {
        const paciente = await Paciente.findById(pacienteId);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        res.json({ paciente: paciente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar el paciente' });
    }
};

exports.getCustomPacientes = async (req, res) => {
    const { sexo, fechaIngreso, enfermedad } = req.query;
    let filtros = {};

    if (sexo) {
        filtros.sexo = sexo;
    }
    if (fechaIngreso) {

        filtros.fechaIngreso = { 
            $gte: new Date(fechaIngreso), $lt: new Date(fechaIngreso).setDate(new Date(fechaIngreso).getDate() + 1) 
        };
    }
    if (enfermedad) {
        filtros.enfermedad = enfermedad;
    }

    try {

        const pacientes = await Paciente.find(filtros);

        res.json(pacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar pacientes' });
    }
};

exports.addPaciente = async (req, res) => {
    const nuevoPaciente = new Paciente(req.body);
    
    try {
        await nuevoPaciente.save();
        res.json({ response: 'Paciente agregado correctamente' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({ error: errores });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el paciente' });
        }
    }
};

exports.updatePaciente = async (req, res) => {
    const pacienteId = req.params.id;

    try {
        const paciente = await Paciente.findByIdAndUpdate(pacienteId, req.body, { new: true });

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        res.json({ message: 'Paciente actualizado correctamente', paciente: paciente });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({ error: errores });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el paciente' });
        }
    }
};

exports.deletePaciente = async (req, res) => {
    const pacienteId = req.params.id;

    try {
        const paciente = await Paciente.findByIdAndDelete(pacienteId);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        res.json({ message: 'Paciente eliminado correctamente', paciente: paciente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el paciente' });
    }
};

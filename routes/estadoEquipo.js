const EstadoEquipo = require('../models/EstadoEquipo');
const { validationResult, check } = require('express-validator');
const { Router } = require('express');

const router = Router();

// Crear EstadoEquipo
router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').isIn(['Activo', 'Inactivo']),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const nuevoEstado = new EstadoEquipo({
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaCreacion: new Date(),
                fechaActualizacion: new Date()
            });

            await nuevoEstado.save();
            res.status(201).json(nuevoEstado);

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }
);

// Obtener todos los estados
router.get('/', async (req, res) => {
    try {
        const estados = await EstadoEquipo.find();
        res.json(estados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// Obtener estado por ID
router.get('/:id', async (req, res) => {
    try {
        const estado = await EstadoEquipo.findById(req.params.id);
        if (!estado) {
            return res.status(404).json({ msg: 'Estado no encontrado' });
        }
        res.json(estado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// Actualizar estado
router.put(
    '/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').isIn(['Activo', 'Inactivo']),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const estado = await EstadoEquipo.findById(req.params.id);
            if (!estado) {
                return res.status(404).json({ msg: 'Estado no encontrado' });
            }

            estado.nombre = req.body.nombre;
            estado.estado = req.body.estado;
            estado.fechaActualizacion = new Date();

            await estado.save();
            res.json(estado);

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }
);

// Eliminar estado
router.delete('/:id', async (req, res) => {
    try {
        const estado = await EstadoEquipo.findByIdAndDelete(req.params.id);
        if (!estado) {
            return res.status(404).json({ msg: 'Estado no encontrado' });
        }
        res.json({ msg: 'Estado eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;

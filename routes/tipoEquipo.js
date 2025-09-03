const TipoEquipo = require('../models/TipoEquipo');
const { validationResult, check } = require('express-validator');
const { Router } = require('express');

const router = Router();

// Crear TipoEquipo
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
            const nuevoTipo = new TipoEquipo({
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaCreacion: new Date(),
                fechaActualizacion: new Date()
            });

            await nuevoTipo.save();
            res.status(201).json(nuevoTipo);

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }
);

// Obtener todos los tipos
router.get('/', async (req, res) => {
    try {
        const tipos = await TipoEquipo.find();
        res.json(tipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// Obtener tipo por ID
router.get('/:id', async (req, res) => {
    try {
        const tipo = await TipoEquipo.findById(req.params.id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo de equipo no encontrado' });
        }
        res.json(tipo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// Actualizar tipo
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
            const tipo = await TipoEquipo.findById(req.params.id);
            if (!tipo) {
                return res.status(404).json({ msg: 'Tipo de equipo no encontrado' });
            }

            tipo.nombre = req.body.nombre;
            tipo.estado = req.body.estado;
            tipo.fechaActualizacion = new Date();

            await tipo.save();
            res.json(tipo);

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }
);

// Eliminar tipo
router.delete('/:id', async (req, res) => {
    try {
        const tipo = await TipoEquipo.findByIdAndDelete(req.params.id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo de equipo no encontrado' });
        }
        res.json({ msg: 'Tipo de equipo eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;

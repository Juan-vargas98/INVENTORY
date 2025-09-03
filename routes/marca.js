const Marca = require('../models/Marca');
const { validationResult, check } = require('express-validator');
const { Router } = require('express');

const router = Router();

// Crear Marca
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
            const nuevaMarca = new Marca({
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaCreacion: new Date(),
                fechaActualizacion: new Date()
            });

            await nuevaMarca.save();
            res.status(201).json(nuevaMarca);

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }
);

// Obtener todas las marcas
router.get('/', async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// Obtener una marca por ID
router.get('/:id', async (req, res) => {
    try {
        const marca = await Marca.findById(req.params.id);
        if (!marca) {
            return res.status(404).json({ msg: 'Marca no encontrada' });
        }
        res.json(marca);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// Actualizar una marca
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
            const marca = await Marca.findById(req.params.id);
            if (!marca) {
                return res.status(404).json({ msg: 'Marca no encontrada' });
            }

            marca.nombre = req.body.nombre;
            marca.estado = req.body.estado;
            marca.fechaActualizacion = new Date();

            await marca.save();
            res.json(marca);

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }
);

// Eliminar una marca
router.delete('/:id', async (req, res) => {
    try {
        const marca = await Marca.findByIdAndDelete(req.params.id);
        if (!marca) {
            return res.status(404).json({ msg: 'Marca no encontrada' });
        }
        res.json({ msg: 'Marca eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;

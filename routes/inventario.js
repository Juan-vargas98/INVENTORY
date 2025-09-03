const Inventario = require('../models/Inventario');
const { validationResult, check } = require('express-validator');
const { Router } = require('express');

const router = Router();

// Crear Inventario
router.post(
    '/',
    [
        check('serial', 'El serial es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('foto', 'La foto es obligatoria').not().isEmpty(),
        check('color', 'El color es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatorio').isNumeric(),
        check('marca', 'La marca es obligatoria').not().isEmpty(),
        check('estadoEquipo', 'El estado del equipo es obligatorio').not().isEmpty(),
        check('tipoEquipo', 'El tipo de equipo es obligatorio').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const nuevoInventario = new Inventario({
                serial: req.body.serial,
                modelo: req.body.modelo,
                descripcion: req.body.descripcion,
                foto: req.body.foto,
                color: req.body.color,
                fechaCompra: req.body.fechaCompra || new Date(),
                precio: req.body.precio,
                usuario: req.body.usuario || null,
                marca: req.body.marca,
                estadoEquipo: req.body.estadoEquipo,
                tipoEquipo: req.body.tipoEquipo,
                fechaCreacion: new Date(),
                fechaActualizacion: new Date()
            });

            await nuevoInventario.save();
            res.status(201).json(nuevoInventario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }
);

// Obtener todos los inventarios con referencias
router.get('/', async (req, res) => {
    try {
        const inventarios = await Inventario.find()
            .populate('usuario', 'nombre email')
            .populate('marca', 'nombre')
            .populate('estadoEquipo', 'nombre estado')
            .populate('tipoEquipo', 'nombre estado');
        res.json(inventarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// Obtener inventario por ID con referencias
router.get('/:id', async (req, res) => {
    try {
        const inventario = await Inventario.findById(req.params.id)
            .populate('usuario', 'nombre email')
            .populate('marca', 'nombre')
            .populate('estadoEquipo', 'nombre estado')
            .populate('tipoEquipo', 'nombre estado');

        if (!inventario) return res.status(404).json({ msg: 'Inventario no encontrado' });

        res.json(inventario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// Actualizar inventario
router.put(
    '/:id',
    [
        check('serial', 'El serial es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('foto', 'La foto es obligatoria').not().isEmpty(),
        check('color', 'El color es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatorio').isNumeric(),
        check('marca', 'La marca es obligatoria').not().isEmpty(),
        check('estadoEquipo', 'El estado del equipo es obligatorio').not().isEmpty(),
        check('tipoEquipo', 'El tipo de equipo es obligatorio').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const inventario = await Inventario.findById(req.params.id);
            if (!inventario) return res.status(404).json({ msg: 'Inventario no encontrado' });

            inventario.serial = req.body.serial;
            inventario.modelo = req.body.modelo;
            inventario.descripcion = req.body.descripcion;
            inventario.foto = req.body.foto;
            inventario.color = req.body.color;
            inventario.fechaCompra = req.body.fechaCompra || inventario.fechaCompra;
            inventario.precio = req.body.precio;
            inventario.usuario = req.body.usuario || null;
            inventario.marca = req.body.marca;
            inventario.estadoEquipo = req.body.estadoEquipo;
            inventario.tipoEquipo = req.body.tipoEquipo;
            inventario.fechaActualizacion = new Date();

            await inventario.save();
            res.json(inventario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error del servidor' });
        }
    }
);

// Eliminar inventario
router.delete('/:id', async (req, res) => {
    try {
        const inventario = await Inventario.findByIdAndDelete(req.params.id);
        if (!inventario) return res.status(404).json({ msg: 'Inventario no encontrado' });

        res.json({ msg: 'Inventario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;

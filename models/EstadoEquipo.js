const { Schema, model} = require('mongoose')

const EstadoEquipoSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inativo'] },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now },

    })

    module.exports = model('EstadoEquipo', EstadoEquipoSchema)


    
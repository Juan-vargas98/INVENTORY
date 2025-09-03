const { Schema, model} = require('mongoose')

const TipoEquipoSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inativo'] },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now },

    })

    module.exports = model('TipoEquipoSchema', TipoEquipoSchema)


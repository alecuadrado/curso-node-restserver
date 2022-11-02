
const {Schema, model} = require('mongoose');



const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'], 
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El mail es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'El pass es obligatorio'],
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

    rol: {
        type:String,
        required:true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
});

UsuarioSchema.methods.toJSON = function () { //Sirve para limpiar de datos inecesarios del objeto usuario, y devolverlos solo con los datos que necesito devolver. 
    const {__v, password, ...usuario} = this.toObject();
    return usuario
}

module.exports = model('Usuario', UsuarioSchema);
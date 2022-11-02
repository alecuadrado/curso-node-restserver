const { Schema, model } = require('mongoose')

const RoleSchema= Schema({
    rol:{
        type: String,
        requiered: [true, 'El Rol es Obligatorio']
    }

});


module.exports = model ('Role', RoleSchema)

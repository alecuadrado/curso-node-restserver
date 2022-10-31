const { response, request, query } = require('express');


const usuariosGet = (req = request, res = response) => {
    const {q, nombre="No Name", apikey} = req.query; //Desestructuracion de argumentso de la query. Se podria pedir la query completa, o elementos especificos
    
    res.json({
        msg:'get Api - controlador',
        q,nombre,apikey
    
    });

}

const usuariosPut = (req, res = response) => {
    const {id} = req.params; //Toma el dato del usuario. En este caso un ID
    res.json({
        msg:'Put Api - controlador',
        id
    });

}

const usuariosPost = (req, res = response) => {
    const {Nombre, Edad} = req.body; //Recupera la info del body, que pide el Post. En este cas, un Json, desestructurado

    res.json({
        msg:'Post Api - controlador',
        Nombre, Edad
    });

}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'Patch Api - controlador'
    });

}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg:'Delete Api - controlador'
    });

}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}
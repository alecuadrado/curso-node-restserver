const Role = require('../models/role');
const Usuario = require('../models/usuario.models');

const esRoleValido = async(rol= '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la BD `)
    }
};

const emailExiste = async (correo = '') =>{
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail){
        throw new Error(`El Correo ${correo } Ya Existe`) 
        }
    }// Condicional para verificar la existencia del correo. Devuelve el Json con el msg

const existeUsuarioPorId = async ( id ) =>{
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario){
        throw new Error(`El Usuario con ID > ${ id } No Existe`) 
        }
    }

module.exports = {
    esRoleValido, 
    emailExiste,
    existeUsuarioPorId
}
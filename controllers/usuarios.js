const { response, request, query } = require('express');
const bcryptjs = require('bcryptjs');
// const {validationResult} = require('express-validator');

const Usuario = require('../models/usuario.models'); // instanciando un usuario nuevo. Por eso la mayuscula.


const usuariosGet = async (req = request, res = response) => {

    // const {q, nombre="No Name", apikey} = req.query; //Desestructuracion de argumentso de la query. Se podria pedir la query completa, o elementos especificos
    const {limite = 5, desde = 0} = req.query //del query siempre llega como string. Para usarlo como num, hay que castearlo. Si no, da error. 
    const query = {estado: true}
    // const usuarios = await Usuario.find({ estado: True }) //el find puede recibir como parametro el valor del estado para filtrarlo
    //     .skip(Number(desde))
    //     .limit(Number(limite)); // limit espera un number. Si no se castea la constante, da error
    //     //esto genera la paginacion de la muestra de resultado
    
    // const total = await Usuario.countDocuments({ estado: True });

    const [total, usuarios] = await Promise.all([ // la Promise, ejecuta las dos lineas en simultaneo y presenta los resultados una vez que los tenga todos. Es mas efectivo que ejecutar linea a linea. Esto se lo desestructura, en dos valores dentro del Array. 
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total, 
        msg:'get Api - controlador',
        usuarios
    
    });

}

const usuariosPut = async (req, res = response) => {
    
    const {id} = req.params; //Toma el dato del usuario. En este caso un ID
    const {_id, password, google, ...resto } = req.body; //Desestructuracion. El _id es para protejer de no modificar el ID generado por la BD. Si viene ese dato, puede romper la rta

    //TODO validar contra base de datos
    if (password) {
        //Encriptar Contraseña
        const salt = bcryptjs.genSaltSync(); //determina el nivel de encriptacion para el hash. Def. 10
        resto.password = bcryptjs.hashSync(password, salt) //Toma el pass, y lo pasa por el salt (numero de vueltas de encriptacion)
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    res.json({
        msg:'Put Api - controlador',
        usuario
    });

}

const usuariosPost = async (req, res = response) => {
    
    // const errors = validationResult(req); //verifica todos los errores recopilados por el Check
    // if (!errors.isEmpty()){
    //     return res.status(400).json(errors)
    // } Comentado, porque se hizo el Middleware de la validacion
    
    
    
    
    const {nombre, correo, password, rol} = req.body; //Recupera la info del body, que pide el Post. En este cas, un Json, desestructurado, si se pide como const {name, age} = req.params
    const usuario = new Usuario({nombre, correo, password, rol});
    
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail){
        return res.status(400).json({
            msg: 'El Correo Ya Existe'
        })
    } // Condicional para verificar la existencia del correo. Devuelve el Json con el msg


    // Encriptar Contraseña
    const salt = bcryptjs.genSaltSync(); //determina el nivel de encriptacion para el hash. Def. 10
    usuario.password = bcryptjs.hashSync(password, salt) //Toma el pass, y lo pasa por el salt (numero de vueltas de encriptacion)

    
    //Guardar en BD si no hay errores.
    await usuario.save(); //graba los datos de la instancia usuario en la base de datos, por medio de Mongoose
    

    res.json({
        //msg:'Post Api - controlador',
        usuario
    });

}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'Patch Api - controlador'
    });

}
const usuariosDelete = async (req, res = response) => {

    const {id} = req.params

    //const usuario = await Usuario.findByIdAndDelete(id); // Esto se usa para eliminar fisicamente de la base de datos, pero no se suele hacer para protejer la integridad referencial del registro
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}); // Para "Borar", lo usual es cambiar el estado, del parametro estado, a false, para filtrarlo y no tenerlo en cuenta en el front a pesar que sigue presente en la BD.


    res.json({
        usuario,
        msg:'COntacto Eliminado'
    });

}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}
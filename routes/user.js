const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');



const { usuariosGet,
        usuariosPut, 
        usuariosPatch, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y de mas de 6 letras').isLength({min: 6}),
    //check('correo', 'El valor no es valido').isEmail(), //El campo del medio, es para Middlewares. El resto, verifica que el campo tenga un correo valido como valor. Eso lo almacena en una variable, para recopilar todos los errores y mostrarlos cuando se lance el metodo.
    check('correo').custom(emailExiste),
    // check('rol', 'El rol es incorrecto').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido 
        //async(rol= '') => {
        //const existeRol = await Role.findOne({ rol });
        //if(!existeRol){
        //    throw new Error(`El rol ${ rol } no esta registrado en la BD `)} Todo esto se paso a Helpers, como modulo. 
    ),
    validarCampos   
], usuariosPost) 


router.patch('/', usuariosPatch) 
router.delete('/:id',[
    check('id', 'No es un ID Valido').isMongoId(), //verifica que el ID sea de Mongo
    check('id').custom(existeUsuarioPorId),
    validarCampos,
    
], usuariosDelete)


router.put('/:id',[
    check('id', 'No es un ID Valido').isMongoId(), //verifica que el ID sea de Mongo
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos,
], usuariosPut)

// router.put('/',  (req, res) => {
//     res.status(201).json({ //el status devuelve el codigo del servidor que configure.
//         msg: 'put API'
//     });
// });

// router.post('/',  (req, res) => {
//     res.json({
//         msg: 'post API'
//     });
// });

// router.delete('/',  (req, res) => {
//     res.json({
//         msg: 'delete API'
//     });
// });



module.exports = router;



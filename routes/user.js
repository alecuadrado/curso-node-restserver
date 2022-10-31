const {Router} = require('express');
const { usuariosGet,usuariosPut, usuariosPatch, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();



router.get('/', usuariosGet)
router.post('/', usuariosPost) 
router.patch('/', usuariosPatch) 
router.delete('/', usuariosDelete)
router.put('/:id', usuariosPut)

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



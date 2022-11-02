const {validationResult} = require('express-validator');


const validarCampos = (req, res, next) => {
    
    const errors = validationResult(req); //verifica todos los errores recopilados por el Check
    if (!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    
    next(); // Es una funcion que determina el final del middleware. Cuando termina el proceso, pasa al siguiente, middleware o controlador. 
}



module.exports = {
    validarCampos
}
const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersPath= '/api/users';
        //Middlewares
        this.middlewares();
        //Rutas de mi Applicacion
        this.routes();
    }

    middlewares(){
        
        //CORS (Cross domain acces) Sirve para controlar las interacciones de los endpoints del Middleware
        this.app.use( cors() )
        
        //Lectura y parseo del body

        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

    }


    routes(){
        this.app.use(this.usersPath, require('../routes/user'));
    }
    listen () {
    this.app.listen(this.port , () => {
        console.log('Servidor corriendo en puerto ', process.env.PORT);
    
    });
    

    }
}

module.exports = Server;
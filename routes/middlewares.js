//const fs = require('fs');
const fsPromise = require('fs').promises
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

//Registra una línea de log en un fichero por cada petición que reciba (método, url y fecha)
function MiddlewareLog(req, res, next) {

    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const method = req.method
    const dateNow = new Date();
    const text = "Metodo: " + method + " Url: " + url + ' Fecha: ' + dateNow.getDate() + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getFullYear() + "\n";

    fsPromise.appendFile('./log/log.txt', text)
        .then(() => console.log('Log registrado'))
        .catch(err => console.log('Se ha producio un error', err));
    next();
}


const checkToken = async (req, res, next) => {

    if (!req.headers['authorization']) {

        return res.status(403).json({ error: 'Debes incluir la cabecera de autorización' })

    }
    //Valida el token
    const token = req.headers['authorization'];

    let payload;

    try {

        payload = jwt.verify(token, 'CLAVE SECRETA');

    } catch (error) {

        return res.status(403).json({

            error: 'El token es incorrecto',

            msg: error.message

        })

    }
    //Comprueba el token no ha expirado
    if (payload.expiredAt < dayjs().unix()) {

        return res.status(403).json({ error: 'El token está caducado' });

    }
    req.user = payload.userId;



    next();

}



module.exports = { MiddlewareLog, checkToken };
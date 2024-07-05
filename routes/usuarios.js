const express = require('express');
const router = express.Router();
const { insertUsuarios, getPassword, countUser } = require('../models/usuarios')
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');


//POST http://localhost:3333/usuarios/
router.post('/', (req, res) => {
    ;
    const name = req.body.name;
    const email = req.body.email;

    console.log(req.body.password);
    const password = bcrypt.hashSync(req.body.password, 10);


    countUser(name, email).then(rows => {


        console.log(rows[0]["count(id)"]);
        if (rows[0]["count(id)"] == 0) {


            insertUsuarios(name, email, password)
                .then(rows => res.json(rows))
                .catch(error => res.json({ error: error.message }));
        } else {

            res.json({ error: 'Error el usuario ya existe' });
        }

    })
        .catch(error => res.json({ error: error.message }));


});


//POST http://localhost:3333/usuarios/login
router.post('/login', (req, res) => {


    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password;




    getPassword(name, email)

        .then(row => {

            if (row.length == 0) {
                res.json({ error: 'Error no existe ese usuario' });
                return;
            }
            const auth = bcrypt.compareSync(password, row[0].password);

            if (auth) {
                const payload = {

                    userId: row[0].id,

                    expiredAt: dayjs().add(60, 'minutes').unix(),

                    createdAt: dayjs().unix()

                }

                const token = jwt.sign(payload, 'CLAVE SECRETA');
                res.json({ token })
            } else {

                res.json({ error: 'Error en usuario y/o password' });
            }
        })
    //  .catch(error => res.json({ error: error.message }));
});


module.exports = router;
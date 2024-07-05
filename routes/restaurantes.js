const express = require('express');
const router = express.Router();
const { getAll, insertRestaurant, updateRestaurant, deleteRestaurant, getuserOwner } = require("../models/restaurantes")
const { checkToken } = require('./middlewares')
const { getAdmin } = require('../models/usuarios')

// GET http://localhost:3333/restaurantes/
router.get('/', (req, res) => {

    getAll()
        .then(rows => res.json(rows))
        .catch(error => res.json({ error: error.message }));
});



//POST http://localhost:3333/restaurantes/
router.post('/', checkToken, (req, res) => {
    const name = req.body.name
    const userOwner = req.body.userOwner

    insertRestaurant(name, userOwner)
        .then(rows => res.json(rows))
        .catch(error => res.json({ error: error.message }));
});


//PUT http://localhost:3333/restaurantes/
router.put('/:id', checkToken, (req, res) => {

    const user = req.user
    const restaurantId = req.params.id
    getuserOwner(restaurantId)
        .then(rows => {
            if (rows[0].userOwner == user) {
                const name = req.body.name

                updateRestaurant(name, restaurantId)
                    .then(rows => res.json(rows))
                    .catch(error => res.json({ error: error.message }));
            } else {

                res.json({ err: "Usuario no autorizado" })
            }
        })
        .catch(error => res.json({ error: error.message }));





});

//DELETE http://localhost:3333/restaurantes/
router.delete('/:id', checkToken, (req, res) => {

    const userId = req.params.id
    const user = req.user
    getAdmin(user)
        .then((rows) => {
            if (rows[0].rol == "admin") {
                deleteRestaurant(userId)
                    .then(rows => res.json(rows))
                    .catch(error => res.json({ error: error.message }));

            } else {
                res.json({ err: "Usuario no autorizado" })
            }

        })





});


module.exports = router;
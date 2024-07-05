const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM restaurantes',
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        )
    });
}

const insertRestaurant = (name, userOwner) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO restaurantes (id, name, userOwner) VALUES ( null, ?, ? )',
            [name, userOwner],
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        )
    })
}

const updateRestaurant = (name, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE restaurantes SET name=? WHERE id=?',
            [name, id],
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        )

    })
}

const deleteRestaurant = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM restaurantes WHERE ID =?',
            [id],
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        )

    })
}
const getuserOwner = (restaurantId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT userOwner FROM restaurantes WHERE id=?',
            [restaurantId],
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        )

    })
}

module.exports = { getAll, insertRestaurant, updateRestaurant, deleteRestaurant, getuserOwner }
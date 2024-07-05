


const countUser = (name, email) => {

    return new Promise((resolve, reject) => {
        db.query(
            'SELECT count(id) FROM usuarios WHERE  username = ? OR email = ?;  ',
            [name, email],
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        )
    })

}


const insertUsuarios = (name, email, password) => {

    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO usuarios (id, username, rol, email, password) VALUES ( null, ?, "default", ?, ?)',
            [name, email, password],
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        )
    })
}

const getPassword = (name, email) => {
    return new Promise((resolve, reject) => {

       
        db.query(
            'SELECT password, id FROM usuarios WHERE username = ? OR email = ?;',
            [name, email],
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        )
    })

}


const getAdmin = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT rol FROM usuarios WHERE id = ? ;',
            [id],
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        )
    })

}
module.exports = { insertUsuarios, getPassword, getAdmin, countUser }
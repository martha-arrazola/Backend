const mysql = require('mysql2')

exports.connect = function (done) {

    let pool = mysql.createPool({

        host: 'localhost',

        user: 'root',

        password: 'MyBest2025*#',

        database: 'restaurantes',

        port: 3306

    })

    global.db = pool;

}
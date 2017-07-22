'use strict';

let connection = require('./../db/database.js');

class User {

    constructor(email, password, id) {
      this.email = email;
      this.password = password;
    }

    addUser() {
        let email = this.email;
        let password = this.password;
        return new Promise(function (resolve, reject) {
            connection.query('INSERT INTO user (email, password) values (?, ?)', [email, password], function (err, rows, fields) {
                if (!err) {
                    console.log('Add User: ');
                    resolve(true);
                }
                else {
                    console.log('Error while performing Query: ' + err);
                    reject(err);
                }

            });
        });
    }

    static findUser(email) {
        return new Promise(function (resolve, reject) {
            connection.query('SELECT * from user WHERE email = ?', [email], function (err, rows, fields) {
                if (!err) {

                    if (rows.length > 1) {
                        console.log("Error: find more users from 1");
                        reject("Error: find more users from 1");
                    } else if (rows.length == 1) {
                        console.log("findUser");
                        resolve(rows[0]);
                    } else {
                        console.log("User not found");
                        resolve(false);
                    }
                }
                else {
                    console.log('Error while performing Query: ' + err);
                    reject(err);
                }
            });
        });
    }
}

module.exports = User;
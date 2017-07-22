let mysql = require('mysql');

let db_config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sd_database'
};

let connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        // console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            console.log("code: PROTOCOL_CONNECTION_LOST" );
            handleDisconnect();                         // lost due to either server restart, or a
        } else if (err.fatal) {
            console.log("FATAL ERROR: " + err.fatal);
            console.trace();
            handleDisconnect(); 
        } else {                                      // connnection idle timeout (the wait_timeout
            console.log("FATAL ERROR: " + err);
            console.log("FATAL ERROR code: " + err.code);
            throw err;                                  // server variable configures this)
        }
    });
}

var pool = mysql.createPool({
    connectionLimit: 10,
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
});

module.exports = pool;
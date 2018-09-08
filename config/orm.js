var connection = require("../config/connection");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
};


var orm = {
    // show all burgers
    selectAll: function (table, callback) {
        connection.query("SELECT * FROM " + table + ";", function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },
    // insert a burger name
    insertOne: function (vals, callback) {
        connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, false);", [vals], function (err, result) {
            if (err) {
                throw err
            };
            callback(result);
        });
    },
    // delete a burger
    updateOne: function (table, objColVal, condition, callback) {
        var queryString = "UPDATE " + table + " SET " + objToSql(objColVal) + " WHERE " + condition;
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    }
};

module.exports = orm;
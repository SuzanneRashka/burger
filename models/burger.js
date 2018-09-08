var orm = require("../config/orm");

var burger = {
    all: function (callback) {
        orm.selectAll("burgers", function (res) {
            callback(res);
        });
    },
    create: function (vals, callback) {
        orm.insertOne(vals, function (res) {
            callback(res);
        });
    },
    update: function (objColVal, condition, callback) {
        orm.updateOne("burgers", objColVal, condition, function (res) {
            callback(res);
        });
    }
};

module.exports = burger;
var express = require("express");

var router = express.Router();

var burger = require("../models/burger");

//Routes

// select all burgers
router.get('/', function (req, res) {
    burger.all(function (data) {
        var hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });
});

// create a new burger
router.post('/api/burgers', function (req, res) {
    burger.create(req.body.burger_name, function (result) {
        res.json({
            id: result.insertId
        });
        console.log(result);
    });
});

// delete a burger
router.put('api/burgers/:id', function (req, res) {
    var condition = "id = " + req.params.id;
    //call burger.js in models to access update to trigger updateOne in orm.js
    console.log("condition in controller = " + condition);
    burger.update({
        devoured: true
    }, condition, function (result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// router.get('/', function (req, res) {
//     res.redirect('/index');
// });

module.exports = router;
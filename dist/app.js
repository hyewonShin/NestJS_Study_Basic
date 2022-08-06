"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_models_1 = require("./app.models");
var app = express();
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    console.log("this is middlware");
    next();
});
app.use(express.json());
app.get("/cats", function (req, res) {
    try {
        var cats = app_models_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats: cats,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.massage,
        });
    }
});
app.get("/cat/:id", function (req, res) {
    try {
        var id_1 = req.params.id;
        console.log("파라미터id확인", id_1);
        var cat = app_models_1.Cat.find(function (cats) {
            return cats.id === id_1;
        });
        res.send({ success: true, data: cat });
    }
    catch (error) {
        res.send({ success: false, error: error.message });
    }
});
app.post("/cat", function (req, res) {
    try {
        var data = req.body;
        console.log("Data", data);
        app_models_1.Cat.push(data);
        res.send({ success: true, data: { data: data } });
    }
    catch (error) {
        res.send({ success: false, error: error.message });
    }
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send({ error: "404에러입니다." });
});
app.listen(7000, function () {
    console.log("server is on...");
});
//# sourceMappingURL=app.js.map
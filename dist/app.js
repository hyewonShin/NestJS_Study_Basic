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
app.get("/cats/som", function (req, res, next) {
    console.log("이것은 som 미들웨어이다!");
    next();
});
app.get("/", function (req, res) {
    res.send({ cats: app_models_1.Cat });
});
app.get("/cats/blue", function (req, res, next) {
    res.send({ blue: app_models_1.Cat[0] });
});
app.get("/cats/som", function (req, res) {
    res.send({ som: app_models_1.Cat[1] });
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send({ error: "404에러입니다." });
});
app.listen(8000, function () {
    console.log("server is on...");
});
//# sourceMappingURL=app.js.map
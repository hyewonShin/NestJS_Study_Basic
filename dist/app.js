"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_models_1 = require("./app.models");
var app = express();
app.get("/", function (req, res) {
    console.log(req);
    res.send({ cats: app_models_1.Cat });
});
app.listen(8000, function () {
    console.log("server is on...");
});
//# sourceMappingURL=app.js.map
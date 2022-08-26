"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
var PORT = 4000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});

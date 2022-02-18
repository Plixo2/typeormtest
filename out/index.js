"use strict";
exports.__esModule = true;
var express = require("express");
var typeorm_1 = require("typeorm");
var User_1 = require("./entities/User");
var app = express();
(0, typeorm_1.createConnection)({
    type: 'mysql',
    database: 'localdb',
    username: 'root',
    password: 'mysql',
    logging: true,
    synchronize: true,
    entities: [User_1.User]
});
// app.listen(3000, () => {
//     console.log('Server is running');
// });

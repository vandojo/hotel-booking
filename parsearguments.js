"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArgs = exports.displayHelp = void 0;
var displayHelp = function () {
    console.log("This app allows the user to check room availability for: \na specified hotel \ndate range \nroom type");
    console.log("for help type: node app.js -help ");
    console.log("To get availability type:");
    console.log("node app.js -hotel <hotelname> -date <date> -room <roomtype>");
    console.log("For example: node app.js -hotel H1 -date 20240901 -room SGL");
    return;
};
exports.displayHelp = displayHelp;
var checkArgs = function (args, param) {
    var argIdx = args.indexOf(param);
    var argValue;
    if (argIdx > -1) {
        // get the value after it
        argValue = args[argIdx + 1];
    }
    else {
        argValue = undefined;
    }
    return argValue;
};
exports.checkArgs = checkArgs;

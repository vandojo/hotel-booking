"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var args = process.argv;
var parsearguments_1 = require("./parsearguments");
var checkhotel_1 = require("./checkhotel");
var checkbooking_1 = require("./checkbooking");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function readLineAsync(message) {
    return new Promise(function (resolve, reject) {
        rl.question(message, function (answer) {
            resolve(answer);
        });
    });
}
var appLoop = function (hotels, bookings) { return __awaiter(void 0, void 0, void 0, function () {
    var promptInput, args_1, hotel, date, arrival, departure, room, roomsHotel, availableRooms;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 2];
                return [4 /*yield*/, readLineAsync("hotel arrival-departure roomtype> ")];
            case 1:
                promptInput = _a.sent();
                if (promptInput === "") {
                    return [3 /*break*/, 2];
                }
                else {
                    args_1 = promptInput.split(" ");
                    hotel = args_1[0];
                    date = args_1[1].split("-");
                    arrival = date[0];
                    departure = date[1];
                    room = args_1[2];
                    if (hotel === undefined || arrival === undefined || room === undefined) {
                        console.log("No all parameters were valid, see below for help");
                        (0, parsearguments_1.displayHelp)();
                    }
                    roomsHotel = (0, checkhotel_1.checkHotel)(hotel, room, hotels);
                    if (roomsHotel === undefined) {
                        console.log("The hotel does not have rooms of that type");
                        return [3 /*break*/, 2];
                    }
                    availableRooms = void 0;
                    if (departure === undefined) {
                        availableRooms = (0, checkbooking_1.checkBooking)(hotel, room, roomsHotel, bookings, arrival);
                    }
                    else {
                        availableRooms = (0, checkbooking_1.checkBooking)(hotel, room, roomsHotel, bookings, arrival, departure);
                    }
                    if (availableRooms.length <= 0) {
                        console.log(-1);
                        return [3 /*break*/, 0];
                    }
                    else {
                        console.log(availableRooms.length);
                        return [3 /*break*/, 0];
                    }
                }
                return [3 /*break*/, 0];
            case 2:
                rl.close();
                return [2 /*return*/];
        }
    });
}); };
var app = function (args) {
    // Check if the user wants help
    var help = args.filter(function (arg) {
        return arg === "-help" || arg === "-h";
    });
    // If the -help or -h flags are passed the user wants help
    // if no arguments are passed also display app usage
    if (help.length > 0 || args.length === 0) {
        (0, parsearguments_1.displayHelp)();
        return 0;
    }
    // hotel and booking file need to be passed as arguments
    var hotelFile = (0, parsearguments_1.checkArgs)(args, "-hotels");
    var bookingFile = (0, parsearguments_1.checkArgs)(args, "-bookings");
    if (hotelFile === undefined || bookingFile === undefined) {
        console.log("Need a file with hotel data and booking data.");
        return 0;
    }
    var hotels = require(hotelFile);
    var bookings = require(bookingFile);
    appLoop(hotels, bookings);
    return 0;
};
app(args.slice(2));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Data files
var hotels = require("./data/hotels.json");
var bookings = require("./data/bookings.json");
var args = process.argv;
//import { Room, RoomType, Hotel, Booking } from "./types";
var parsearguments_1 = require("./parsearguments");
var parsebookings_1 = require("./parsebookings");
var checkbooking_1 = require("./checkbooking");
var app = function (args) {
    // '-hotel'
    // '-date'
    // '-room'
    // '-help'
    // Check if the user wants help
    var help = args.filter(function (arg) {
        return arg === "-help" || arg === "-h";
    });
    // If the -help or -h flags are passed the user wants help
    // if no arguments are passed also display app usage
    if (help.length > 0 || args.length === 0) {
        (0, parsearguments_1.displayHelp)();
        return;
    }
    // Check that valid parameters exist
    var hotel = (0, parsearguments_1.checkArgs)(args, "-hotel");
    var arrival = (0, parsearguments_1.checkArgs)(args, "-arrival");
    var departure = (0, parsearguments_1.checkArgs)(args, "-departure");
    var room = (0, parsearguments_1.checkArgs)(args, "-room");
    if (hotel === undefined || arrival === undefined || room === undefined) {
        console.log("No all parameters were valid, see below for help");
        (0, parsearguments_1.displayHelp)();
    }
    var roomsHotel = (0, parsebookings_1.checkHotel)(hotel, room, hotels);
    if (roomsHotel === undefined) {
        console.log("The hotel does not have rooms of that type");
        return;
    }
    var availableRooms;
    if (departure === undefined) {
        availableRooms = (0, checkbooking_1.parseBookings)(hotel, room, roomsHotel, bookings, arrival);
    }
    else {
        availableRooms = (0, checkbooking_1.parseBookings)(hotel, room, roomsHotel, bookings, arrival, departure);
    }
    console.log(availableRooms);
    return args[0];
};
app(args.slice(2));

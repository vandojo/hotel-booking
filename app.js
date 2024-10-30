"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Data files
var hotels = require("./data/hotels.json");
var bookings = require("./data/bookings.json");
var args = process.argv;
var parsearguments_1 = require("./parsearguments");
var parsebookings_1 = require("./parsebookings");
var getBookings = function (bookings, hotel_id, room_type) {
    var currBookings = bookings.filter(function (booking) {
        return booking.hotelId == hotel_id && booking.roomType == room_type;
    });
    return currBookings;
};
var bookedRooms = function (bookings, arrival, departure) {
    var books;
    if (departure === undefined) {
        books = bookings.filter(function (booking) {
            return (parseInt(booking.departure) <= parseInt(arrival) ||
                parseInt(booking.arrival) > parseInt(arrival));
        });
    }
    if (departure !== undefined) {
        books = bookings.filter(function (booking) { return parseInt(booking.arrival) >= parseInt(departure); });
    }
    return books;
};
var parseBookings = function (hotel_id, room_type, bookings, arrival, departure) {
    var currBookings = getBookings(bookings, hotel_id, room_type);
    if (departure !== undefined) {
        return bookedRooms(currBookings, arrival, departure);
    }
    else {
        return bookedRooms(currBookings, arrival);
    }
};
// const hotel = searchHotels(args[2], hotels);
// const room = searchRooms(args[3], hotel.rooms);
// const booking = parseBookings(hotel.id, room[0].roomType, bookings, args[4]);
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
    var date = (0, parsearguments_1.checkArgs)(args, "-date");
    var room = (0, parsearguments_1.checkArgs)(args, "-room");
    if (hotel === undefined || date === undefined || room === undefined) {
        console.log("No all parameters were valid, see below for help");
        (0, parsearguments_1.displayHelp)();
    }
    var roomsHotel = (0, parsebookings_1.checkHotel)(hotel, room, hotels);
    console.log(roomsHotel);
    return args[0];
};
app(args.slice(2));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Data files
var hotels = require("./data/hotels.json");
var bookings = require("./data/bookings.json");
var args = process.argv;
var searchHotels = function (hotel_name, all_hotels) {
    var foundHotel = all_hotels.filter(function (hotel) { return hotel.id == hotel_name; })[0];
    return foundHotel;
};
var searchRooms = function (room_name, rooms) {
    var foundRooms = rooms.filter(function (room) { return room.roomType == room_name; });
    return foundRooms;
};
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
var hotel = searchHotels(args[2], hotels);
var room = searchRooms(args[3], hotel.rooms);
var booking = parseBookings(hotel.id, room[0].roomType, bookings, args[4]);
console.log(booking);

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
var hotel = searchHotels(args[2], hotels);
var room = searchRooms(args[3], hotel.rooms);
console.log(room);

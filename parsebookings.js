"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHotel = void 0;
var searchHotels = function (hotel_name, all_hotels) {
    var foundHotel = all_hotels.filter(function (hotel) { return hotel.id == hotel_name; })[0];
    return foundHotel;
};
var searchRooms = function (room_name, rooms) {
    var foundRooms = rooms.filter(function (room) { return room.roomType == room_name; });
    return foundRooms;
};
var checkHotel = function (hotel_name, room_name, all_hotels) {
    var foundHotel = all_hotels.filter(function (hotel) { return hotel.id == hotel_name; })[0];
    var foundRooms;
    if (foundHotel === undefined) {
        return undefined;
    }
    else {
        foundRooms = foundHotel.rooms.filter(function (room) { return room.roomType == room_name; });
        if (foundRooms.length < 1) {
            return undefined;
        }
    }
    return foundRooms;
};
exports.checkHotel = checkHotel;

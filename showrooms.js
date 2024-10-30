"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRoom = void 0;
var showRoom = function (room, hotel) {
    console.log(hotel.name, "has the following rooms and amenities available:");
    hotel.roomTypes
        .filter(function (roomtype) { return roomtype.code == room.roomType; })
        .forEach(function (room) {
        console.log("A ".concat(room.description, " with the following features and amenities: \n").concat(room.features.join(", "), " \n").concat(room.amenities.join(", ")));
    });
    return;
};
exports.showRoom = showRoom;

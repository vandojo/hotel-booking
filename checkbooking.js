"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBooking = void 0;
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
            return (parseInt(booking.departure) > parseInt(arrival) &&
                parseInt(booking.arrival) <= parseInt(arrival));
        });
    }
    else {
        // (StartDate1 <= EndDate2) and (StartDate2 <= EndDate1)
        books = bookings.filter(function (booking) {
            return (parseInt(booking.arrival) < parseInt(departure) &&
                parseInt(arrival) <= parseInt(booking.departure));
        });
    }
    return books;
};
var checkBooking = function (hotel_id, room_type, rooms, bookings, arrival, departure) {
    var currBookings = getBookings(bookings, hotel_id, room_type);
    // return all rooms if no bookings have been made
    if (currBookings.length < 1) {
        return rooms;
    }
    var overlappingBookings;
    if (departure === undefined) {
        overlappingBookings = bookedRooms(currBookings, arrival);
    }
    else {
        overlappingBookings = bookedRooms(currBookings, arrival, departure);
    }
    // Return empty array if no bookings overlap
    if (overlappingBookings.length < 1) {
        return rooms;
    }
    else {
        // Return overlapping number of available rooms
        // and duration of availability
        var amtRooms = rooms.length - overlappingBookings.length;
        return amtRooms <= 0 ? [] : rooms.slice(amtRooms);
    }
};
exports.checkBooking = checkBooking;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBookings = void 0;
var getBookings = function (bookings, hotel_id, room_type) {
    var currBookings = bookings.filter(function (booking) {
        return booking.hotelId == hotel_id && booking.roomType == room_type;
    });
    return currBookings;
};
var bookedRooms = function (bookings, arrival, departure) {
    var books;
    // count bookings that arrive before and leave after the new arrival
    // if this is less than number of rooms, return number of available rooms.
    // if departure is not known, count bookings that arrive before and leave after arrival,
    // subtract from available rooms. return that number of rooms.
    // arrival < arrival and departure > arrival
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
        // // arrival < arrival and departure > departure
        // books.push(
        //   bookings.filter((booking) => {
        //     return (
        //       parseInt(booking.arrival) <= parseInt(arrival) &&
        //       parseInt(booking.departure) > parseInt(departure)
        //     );
        //   })
        // );
        // //arrival < arrival and departure < departure
        // books.push(
        //   bookings.filter((booking) => {
        //     return (
        //       parseInt(booking.arrival) <= parseInt(arrival) &&
        //       parseInt(booking.departure) < parseInt(departure)
        //     );
        //   })
        // );
        // // arrival > arrival and departure < departure
        // books.push(
        //   bookings.filter((booking) => {
        //     return (
        //       parseInt(booking.arrival) >= parseInt(arrival) &&
        //       parseInt(booking.departure) < parseInt(departure)
        //     );
        //   })
        // );
        // // arrival > arrival and departure > departure
        // books.push(
        //   bookings.filter((booking) => {
        //     return (
        //       parseInt(booking.arrival) >= parseInt(arrival) &&
        //       parseInt(booking.departure) > parseInt(departure)
        //     );
        //   })
        // );
    }
    // if departure and arrival are known
    // keep bookings where: arrival < arrival, and departure > departure
    // arrival > arrival and departure < departure
    // arrival < arrival and departure < departure
    // arrival > arrival and departure > departure
    // subtract from available rooms return number of rooms
    // First check which bookings overlap with the new potential booking
    // assigns list to books of bookings that arrive before new booking
    // or leave after new booking
    return books; //.flat();
};
var parseBookings = function (hotel_id, room_type, rooms, bookings, arrival, departure) {
    var currBookings = getBookings(bookings, hotel_id, room_type);
    // return all rooms if no bookings have been made
    if (currBookings.length < 1) {
        return rooms;
    }
    var overlappingBookings;
    if (departure === undefined) {
        console.log("these results are more trustworthy when you suplly an intended departure date");
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
exports.parseBookings = parseBookings;

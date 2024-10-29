// Data files
const hotels = require("./data/hotels.json");
const bookings = require("./data/bookings.json");

const args = process.argv;

import { Room, RoomType, Hotel, Booking } from "./types";

const searchHotels = (hotel_name: string, all_hotels: Hotel[]): Hotel => {
  const foundHotel = all_hotels.filter((hotel) => hotel.id == hotel_name)[0];
  return foundHotel;
};

const searchRooms = (room_name: string, rooms: Room[]): Room[] => {
  const foundRooms = rooms.filter((room) => room.roomType == room_name);

  return foundRooms;
};

const getBookings = (
  bookings: Booking[],
  hotel_id: string,
  room_type: string
): Booking[] => {
  const currBookings = bookings.filter((booking) => {
    return booking.hotelId == hotel_id && booking.roomType == room_type;
  });
  return currBookings;
};

const bookedRooms = (
  bookings: Booking[],
  arrival: string,
  departure?: string
): Booking[] => {
  let books;
  if (departure === undefined) {
    books = bookings.filter((booking) => {
      return (
        parseInt(booking.departure) <= parseInt(arrival) ||
        parseInt(booking.arrival) > parseInt(arrival)
      );
    });
  }

  if (departure !== undefined) {
    books = bookings.filter(
      (booking) => parseInt(booking.arrival) >= parseInt(departure)
    );
  }

  return books;
};

const parseBookings = (
  hotel_id: string,
  room_type: string,
  bookings: Booking[],
  arrival: string,
  departure?: string
): Booking[] => {
  const currBookings = getBookings(bookings, hotel_id, room_type);

  if (departure !== undefined) {
    return bookedRooms(currBookings, arrival, departure);
  } else {
    return bookedRooms(currBookings, arrival);
  }
};

const hotel = searchHotels(args[2], hotels);

const room = searchRooms(args[3], hotel.rooms);

const booking = parseBookings(hotel.id, room[0].roomType, bookings, args[4]);

console.log(booking);

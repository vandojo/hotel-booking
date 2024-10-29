// Data files
const hotels = require("./data/hotels.json");
const bookings = require("./data/bookings.json");

const args = process.argv;

interface RoomType {
  code: string;
  description: string;
  amenities: string[];
  features: string[];
}

interface Room {
  roomType: string;
  roomId: string;
}

interface Hotel {
  id: string;
  name: string;
  roomTypes: RoomType[];
  rooms: Room[];
}

const searchHotels = (hotel_name: string, all_hotels: Hotel[]): Hotel => {
  const foundHotel = all_hotels.filter((hotel) => hotel.id == hotel_name)[0];
  return foundHotel;
};

const searchRooms = (room_name: string, rooms: Room[]): Room[] => {
  const foundRooms = rooms.filter((room) => room.roomType == room_name);

  return foundRooms;
};

const hotel = searchHotels(args[2], hotels);

const room = searchRooms(args[3], hotel.rooms);

console.log(room);

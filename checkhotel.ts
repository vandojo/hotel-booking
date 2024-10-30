import { Hotel, Room } from "./types";

const checkHotel = (
  hotel_name: string,
  room_name: string,
  all_hotels: Hotel[]
): any => {
  const foundHotel = all_hotels.filter((hotel) => hotel.id == hotel_name)[0];

  let foundRooms;
  if (foundHotel === undefined) {
    return undefined;
  } else {
    foundRooms = foundHotel.rooms.filter((room) => room.roomType == room_name);
    if (foundRooms.length < 1) {
      return undefined;
    }
  }

  return foundRooms;
};

export { checkHotel };

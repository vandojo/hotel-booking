import { RoomType, Room, Hotel } from "./types";

const showRoom = (room: Room, hotel: Hotel): void => {
  console.log(hotel.name, "has the following rooms and amenities available:");

  hotel.roomTypes
    .filter((roomtype) => roomtype.code == room.roomType)
    .forEach((room) => {
      console.log(
        `A ${
          room.description
        } with the following features and amenities: \n${room.features.join(
          ", "
        )} \n${room.amenities.join(", ")}`
      );
    });

  return;
};

export { showRoom };

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

interface Booking {
  hotelId: string;
  arrival: string;
  departure: string;
  roomType: string;
  roomRate: string;
}

export { RoomType, Room, Hotel, Booking };

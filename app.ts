// Data files
const hotels = require("./data/hotels.json");
const bookings = require("./data/bookings.json");

const args = process.argv;

import { displayHelp, checkArgs } from "./parsearguments";
import { checkHotel } from "./parsebookings";

import { parseBookings } from "./checkbooking";

import { showRoom } from "./showrooms";

const app = (args: string[]): number => {
  // Check if the user wants help
  let help = args.filter((arg) => {
    return arg === "-help" || arg === "-h";
  });

  // If the -help or -h flags are passed the user wants help
  // if no arguments are passed also display app usage
  if (help.length > 0 || args.length === 0) {
    displayHelp();
    return 0;
  }

  // Check that valid parameters exist
  const hotel = checkArgs(args, "-hotel");
  const arrival = checkArgs(args, "-arrival");
  const departure = checkArgs(args, "-departure");
  const room = checkArgs(args, "-room");

  if (hotel === undefined || arrival === undefined || room === undefined) {
    console.log("No all parameters were valid, see below for help");
    displayHelp();
  }
  const roomsHotel = checkHotel(hotel, room, hotels);

  if (roomsHotel === undefined) {
    console.log("The hotel does not have rooms of that type");
    return 0;
  }

  let availableRooms;

  if (departure === undefined) {
    availableRooms = parseBookings(hotel, room, roomsHotel, bookings, arrival);
  } else {
    availableRooms = parseBookings(
      hotel,
      room,
      roomsHotel,
      bookings,
      arrival,
      departure
    );
  }

  if (availableRooms.length < 0) {
    console.log(
      "No rooms of that type are available for the selected date range. The hotel is overbooked"
    );

    return -1;
  } else {
    showRoom(availableRooms[0], hotels.filter((h) => h.id === hotel)[0]);
    // console.log(availableRooms[0]);
    // console.log(hotels.filter((hotl) => hotl.id === hotel));
  }

  return 0;
};

app(args.slice(2));

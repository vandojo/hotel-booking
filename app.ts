// Data files
const hotels = require("./data/hotels.json");
const bookings = require("./data/bookings.json");

const args = process.argv;

//import { Room, RoomType, Hotel, Booking } from "./types";

import { displayHelp, checkArgs } from "./parsearguments";
import { checkHotel } from "./parsebookings";

import { parseBookings } from "./checkbooking";

const app = (args: string[]): any => {
  // '-hotel'
  // '-date'
  // '-room'
  // '-help'
  // Check if the user wants help
  let help = args.filter((arg) => {
    return arg === "-help" || arg === "-h";
  });

  // If the -help or -h flags are passed the user wants help
  // if no arguments are passed also display app usage
  if (help.length > 0 || args.length === 0) {
    displayHelp();
    return;
  }

  // Check that valid parameters exist
  const hotel = checkArgs(args, "-hotel");
  const date = checkArgs(args, "-date");
  const room = checkArgs(args, "-room");
  if (hotel === undefined || date === undefined || room === undefined) {
    console.log("No all parameters were valid, see below for help");
    displayHelp();
  }
  const roomsHotel = checkHotel(hotel, room, hotels);

  if (roomsHotel === undefined) {
    console.log("The hotel does not have rooms of that type");
    return;
  }

  console.log(roomsHotel);
  return args[0];
};

app(args.slice(2));

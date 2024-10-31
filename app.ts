const readline = require("readline");
const args = process.argv;

import { displayHelp, checkArgs } from "./parsearguments";
import { checkHotel } from "./checkhotel";
import { checkBooking } from "./checkbooking";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readLineAsync(message) {
  return new Promise((resolve, reject) => {
    rl.question(message, (answer) => {
      resolve(answer);
    });
  });
}

const appLoop = async (hotels, bookings) => {
  while (true) {
    var promptInput: any = await readLineAsync(
      "hotel arrival-departure roomtype> "
    );

    if (promptInput === "") {
      break;
    } else {
      const args = promptInput.split(" ");

      // // Check that valid parameters exist
      const hotel = args[0];
      const date = args[1].split("-");
      const arrival = date[0];
      const departure = date[1];
      const room = args[2];

      if (hotel === undefined || arrival === undefined || room === undefined) {
        console.log("No all parameters were valid, see below for help");
        displayHelp();
      }
      const roomsHotel = checkHotel(hotel, room, hotels);

      if (roomsHotel === undefined) {
        console.log("The hotel does not have rooms of that type");
        break;
      }
      let availableRooms;

      if (departure === undefined) {
        availableRooms = checkBooking(
          hotel,
          room,
          roomsHotel,
          bookings,
          arrival
        );
      } else {
        availableRooms = checkBooking(
          hotel,
          room,
          roomsHotel,
          bookings,
          arrival,
          departure
        );
      }
      if (availableRooms.length <= 0) {
        console.log(-1);
        continue;
      } else {
        console.log(availableRooms.length);
        continue;
      }
    }
  }

  rl.close();
};

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

  // hotel and booking file need to be passed as arguments

  const hotelFile = checkArgs(args, "-hotels");
  const bookingFile = checkArgs(args, "-bookings");

  if (hotelFile === undefined || bookingFile === undefined) {
    console.log("Need a file with hotel data and booking data.");
    return 0;
  }

  const hotels = require(hotelFile);
  const bookings = require(bookingFile);

  appLoop(hotels, bookings);

  return 0;
};

app(args.slice(2));

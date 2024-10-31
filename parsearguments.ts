const displayHelp = (): void => {
  console.log(
    `This app allows the user to check room availability for: \na specified hotel \ndate range \nroom type`
  );
  console.log("for help type: node app.js -help ");
  console.log("Program needs a hotels.json and bookings.json file");

  console.log("To run the program, do:");
  console.log(
    "node app.js -hotels ./data/hotels.json -bookings ./data/bookings.json"
  );
  console.log("At the prompt, enter hotel arrival-departure room");

  console.log("For example: H1 20240901-20240903 SGL");

  return;
};

const checkArgs = (args: string[], param: string) => {
  const argIdx = args.indexOf(param);
  let argValue;
  if (argIdx > -1) {
    // get the value after it
    argValue = args[argIdx + 1];
  } else {
    argValue = undefined;
  }

  return argValue;
};

export { displayHelp, checkArgs };

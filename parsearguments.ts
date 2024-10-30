const displayHelp = (): void => {
  console.log(
    `This app allows the user to check room availability for: \na specified hotel \ndate range \nroom type`
  );
  console.log("for help type: node app.js -help ");
  console.log("To get availability type:");
  console.log("node app.js -hotel <hotelname> -date <date> -room <roomtype>");
  console.log("For example: node app.js -hotel H1 -date 20240901 -room SGL");

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

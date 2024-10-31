# Challenge:

Create a program to preview hotel room availability and reservations.

The application should read from files containing hotel data and booking data, then allow a user to check room availability for a specified hotel, date range and room type. The program prints an integer value for the number of rooms available at the hotel for the specified date and room type. A negative value, like -1, means that the room is overbooked.

The program has been written in TypeScript, but compiled to JavaScript for ease of use.

# Steps to run this program

1. Clone this repository.
2. Navigate to the cloned repository
3. Start the app by entering:

```bash
node app.js -hotels <path-to-hotels.json> -bookings <path-to-bookings.json>
```

For example:

```bash
node app.js -hotels ./data/hotels.json -bookings ./data/bookings.json
```

At the prompt input the hotel, arrival and departure date and room type.

In the following format:
hotelname arrival-departure room
For instance:

```bash
H1 20240831 SGL
```

or

```bash
H1 20240901-20240903 DBL
```

Exit the program by pressing `<Enter>`

A negative value means that the room is overbooked for that period of time. Zero means the hotel does not exist or no rooms of that type are available.

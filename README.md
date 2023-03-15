
# Zoomertoon

Zoomertoon is my prototype for a social media website, intended to be used by cartoonists.


To setup, you need Node, Postgres/Postico installed. Clone this repo and `npm install` inside the directory.
Create a `.env` file in the directory and add this: `SERVER_SESSION_SECRET=***`
Replace *** with a random string of letters and numbers.
Using the `database.sql` file, create the database in Postico. Make sure to start the server.
Then, in the terminal, type `npm run server`. In a separate terminal tab, type `npm run client`.
Zoomertoon will open in your browser.


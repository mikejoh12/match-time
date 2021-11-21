# match-time

This project is a sports scheduling platform. It allows users to create sports facilities, resources and invite members by email.
It also allows members to register and book resources in facilities. Users can both be a member and manager of facilities so there are 2 different roles.
Email confirmation and password reset via email link is implemented.

## Status
The project is deployed as a demo at https://matchtime.herokuapp.com/

### Technologies used
The main stack is Postgres, Express, React and Node.js. Passport, jsonwebtoken, and bcrypt are used for authentication/authorization.
Material UI and FullCalendar (fullcalendar.io) are used for the UI. Redux RTK-Query handles state management. Node mailer for emailing.
Backend testing with mocha/supertest. Frontend testing with jest/React Testing Library. Backend documentation with swaggerUI.

### Installation instructions
1. Create a local postgres db
2. Create db tables according to db/create_tables.sql. If desired, seed tables accoring to db/seed_facilities.sql
3. Create a .env file in the /server directory configured with the env-variables found in sample.env but with your own configuration.
4. Run npm install (or yarn if desired) in the root directory.
5. Run npm install (or yarn if desired) in the client/ directory.
6. With concurrently installed globally, the project can be started with "npm run dev" in the root folder.
Otherwise, client and server can be started separately.

#### Todo:
Open up the app structure to a more modern web-flow where user registration happens at the end.

##### Bugs/Feedback
Much appreciated if you let me know if these install instructions work or have any bug reports/suggestions.

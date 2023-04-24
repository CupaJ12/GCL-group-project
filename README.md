# Gold Claim Lodge
This app was designed and created to help maintain booking records for Gold Claim Lodge, a rental property owned by Mike Derheim.
The app is intended for use by Mike, his accountant, and his property manager so that they have a single source to create new bookings
and access older booking information, limiting clerical errors and making the data more accessible to their team. 
Although there is just one rental property, Gold Claim Lodge, affiliated with this app right now, it has been designed to add additional
rental properties in the future. It also currently includes vendors Airbnb and VRBO, but has the capabilities to add any potential future vendors as well.

The "Add Booking" page takes in all associated tenant and financial information and computes the Gross Booking and Net Payout values. 
It includes an area for an initial note to be added. Upon submission, all the data is recorded in the database where it can be accessed later.
The Booking Form is only accessible to those who have Admin account status.

The "Find Booking" page includes a search function, where the user can search for a booking by tenant name, booking dates, or property.
If the search function is not used, the user will see the 10 most recently added bookings. Each booking shows a brief synopsis of the critical booking information, with an option to click through to view the booking in greater details. Once on that page, if the user account is set to admin, they can go in and add more details, edit details, or add additional comments to the booking.

The app requires all registered users to be approved by an admin before they have access to the app. Once approved, their account is automatically set to "Read Only" where there are given access to the "Find Booking" page. Admin accounts have access to the "Admin Panel" page where they can approve any registered account, delete any registered account (except for their own) as well as set or remove Admin status from any account (except for their own).

This app was designed and created by Bakar Elmi, Bryan Highhill, William King, Khue Lee, and Jaffer Muhawesh in 2023.

## Duration: 
3 Week Sprint

## Screen Shots
![Home Page](/public/images/homepage-preview.png)
![Booking Form](/public/images/booking-form-preview.png)
![Find Booking](/public/images/find-booking-preview.png)
![Admin Panel](/public/images/admin-panel-preview.png)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `gold_claim_lodge` 
SQL Setup for database tables can be found in the `database.sql` file

## Development Setup Instructions

- Run `npm install`
- Run `npm install @mui/x-date-pickers`
- Run `npm install @mui/material @emotion/react @emotion/styled`
- Run `npm install dayjs --save`
- Run `npm i react-text-mask --save`
- Run `npm i text-mask-addons --save`
- Run `npm i prop-types`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Technologies Used
- React
- Redux
- Express
- Postgresql
- Node.js
- PG
- Javascript
- CSS
- HTML
- Material UI
- prop-types
(a full list of dependencies can be found in `package.json`)

## Acknowledgement
Thanks to Mike Derheim for the opportunity to work on this app and create something that is practical and helpful to his team.
Thanks to Casie Siekman for her instruction and leadership in learning all these technologies. 
Thanks to all the staff and faculty at Prime Digital Academy who gave us the opportunity to make this application a reality.

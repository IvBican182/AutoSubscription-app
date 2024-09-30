# AutoSubscription-app

> :warning: **Work in progress**

Web app which automates subscriptions for football clubs. It allows team leaders to form groups of players and manage their
team training tactics. Team leaders can also direct their teams with instructions through a posting/commenting system.

## Requirements

* Node v16.7.0
* npm v7.20.3


## How to install

* This project uses Vite for bundling in the frontend part of the project. Other dependencies will be installed as well (
    @reduxjs/toolkit: ^2.2.7,
    @types/react-redux: ^7.1.33,
    react-bootstrap: ^2.10.4,
    react-dom: ^18.3.1,
    react-redux: ^9.1.2,
    react-router: ^6.26.2,
    react-router-dom: ^6.26.2).

* Backend is written in Node.js (Express.js framework) with a PostgreSQL database.


1. clone this project
2. cd into "Frontend" folder and run `npm install`. This will install npm and all the frontend dependencies.
3. cd into "Server" and run - `npm install`. This will install npm and all backend dependencies.
4. Run `npm install` in the root folder of the project
5. Run - `npm run start` while in the Server folder to run the server.
6. Run - `npm run dev` to run the developer server while in the Frontend folder, this will open the app in the browser.



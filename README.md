# Movie Poster API (BukitVista)

This is a mock private API that will return URLs of desired movie posters. It uses a third party service OMDB.

## Endpoints
### PRIVATE ENDPOINTS (MUST HAVE BEARER TOKEN)
1. GET
    - /movies (Forbidden) 
    - /movies/{movie_title} (Returns movie poster URL)
    - /movies/favorite (Returns all of users favorite movie)
2. POST
    - /movies/favorite (Insert into a users favorite movie)

### PUBLIC ENDPOINTS (TO AUTHENTICATE)
1. GET
    - /auth (Confirms whether TOKEN is valid)
    - /auth/login (Urges user to POST their name and password to this endpoint)
2. POST
    - /auth/login (Receives name and password and check if it's valid. Will return TOKEN if it's a success.)

## SETUP
1. Install all the node modules 
**npm install**

2. Setup valid connection MYSQL URI to database 
**Insert at ./database/connection.js**
3. Setup valid database credentials 
**Insert at ./config/config.json**

4. Migrate models to MYSQL. 
**npx sequelize-cli db:migrate**
5. Seed the DB.
**npx sequelize-cli db:seed:all**

6. Run the server.
**npm run dev**

7. Everything should be good to go! I used a request.rest file to send requests to test the app. :)

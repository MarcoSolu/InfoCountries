require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/UsersController");
const FavoriteCountriesController = require("./controllers/FavoriteCountriesController");

const app = express();

app.use(express.json());

app.use(cors({ 
  origin: ['https://info-countries-eight.vercel.app'],
  credentials: true  
}));

app.post("/register", UserController.registerUser);
app.post("/login", UserController.loginUser);
app.post("/change-password", UserController.changePassword);
app.post("/add-favorite", FavoriteCountriesController.addFavoriteCountry);
app.post("/remove-favorite", FavoriteCountriesController.removeFavoriteCountry);            

module.exports = app;
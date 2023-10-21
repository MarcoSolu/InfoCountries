require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const UserControllers = require("./controllers/UserControllers");
const FavoriteCountriesController = require("./controllers/FavouriteCountriesController");

const app = express();

app.use(express.json());

app.use(cors({ 
  origin: ['https://info-countries-eight.vercel.app'],
  credentials: true  
}));

app.post("/register", UserControllers.registerUser);
app.post("/login", UserControllers.loginUser);
app.post("/change-password", UserControllers.changePassword);
app.post("/add-favorite", FavoriteCountriesController.addFavoriteCountry);
app.post("/remove-favorite", FavoriteCountriesController.removeFavoriteCountry);            

module.exports = app;
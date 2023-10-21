const UserModel = require("../models/User");

const addFavoriteCountry = async (req, res) => {
        try {
          const { userEmail, countryCode } = req.body;
  
          console.log("Received request:", userEmail, countryCode);
      
          const user = await UserModel.findOne({ email: userEmail });
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          if (!user.favoriteCountries.includes(countryCode)) {
            user.favoriteCountries.push(countryCode);
            await user.save();
      
            res.json({ message: "Country added to favorites" });
          } else {
            res.json({ message: "Country is already in favorites" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Server error" });
        };
  };

  const removeFavoriteCountry = async (req, res) => {
        try {
          const { userEmail, countryCode } = req.body; 
  
          console.log("Received request:", userEmail, countryCode);
      
          const user = await UserModel.findOne({ email: userEmail });
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          if (user.favoriteCountries.includes(countryCode)) {
            user.favoriteCountries = user.favoriteCountries.filter(
              (code) => code !== countryCode
            );
            await user.save();
      
            res.json({ message: "Country removed from favorites" });
          } else {
            res.json({ message: "Country is not in favorites" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Server error" });
        };
  };

module.exports = { addFavoriteCountry, removeFavoriteCountry };
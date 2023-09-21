require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcrypt');
const User = require('./models/User');
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({ 
  origin: "http://localhost:3000",
  credentials: true  
}));

app.post("/register", async (req, res) => {
    
    try {
        
        const { name, email, password } = req.body;

        if (!(email && password && name)) {
        return res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        });

        const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_PHRASE,
        {
            expiresIn: "2h",
        }
        );
        
        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
    });
    
    app.post("/login", async (req, res) => {
        try {
            
            const { email, password } = req.body;
        
            if (!(email && password)) {
              return res.status(400).send("All input is required");
            }
           
            const user = await User.findOne({ email });
        
            if (user && (await bcrypt.compare(password, user.password))) {
             
              const token = jwt.sign(
                { user_id: user._id, email },
                process.env.JWT_SECRET_PHRASE,
                {
                  expiresIn: "2h",
                }
              );
        
              user.token = token;
        
              res.status(200).json(user);
            }
            res.status(400).send("Invalid Credentials");
          } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
          }
    
    });

    app.post("/change-password", async (req, res) => {
      try {
        const { email, newPassword } = req.body;
    
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        user.password = hashedPassword;
    
        await user.save();
    
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiration = undefined;
    
        res.status(200).json({ message: "Password changed successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

module.exports = app;
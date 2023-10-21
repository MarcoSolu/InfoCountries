const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const registerUser = async (req, res) => {
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
            if (!res.headersSent) {
              res.status(500).send("Internal Server Error");
          }
        }
        });
  };
  
  
  const loginUser = async (req, res) => {
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
        
              return res.status(200).json({ user, token });
            }
            return res.status(400).send("Invalid Credentials");
          } catch (err) {
            console.log(err);
            if (!res.headersSent) {
              res.status(500).send("Internal Server Error");
          }
          }
    
    });
  };
  
  const changePassword = async (req, res) => {
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
      
          return res.status(200).json({ message: "Password changed successfully" });
        } catch (err) {
          console.error(err);
          if (!res.headersSent) {
            res.status(500).send("Internal Server Error");
        }
        }
      });
  };

module.exports = { registerUser, loginUser, changePassword };
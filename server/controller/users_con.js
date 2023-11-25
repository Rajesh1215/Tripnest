const express= require('express');
const router=express.Router();
const { users }=require("../models");
const {generateToken,verifyToken} = require("../middlewares/authentication.js");
const {loginUser,hashPassword} = require("../middlewares/login.js");

function generateRandomUser(username) {
    // You can change this to any username you prefer
    const email = `${username}@example.com`;
    const password = "password";
    const sid = `${Math.floor(Math.random() * 10000)}`;
  
    return {
      Username: username,
      Email: email,
      Password: password,
      SID: ""
    };
  }

  router.post("/user/login",(req,res,next)=>{
    try{
       
    loginUser(req,res);
     
    }
    catch(error){
        res.status(500).json({ error: "Internal server error"+error });
    }
});
  
router.post("/token-ver",verifyToken);
router.get("/all/:useremail",async(req,res)=>{
    const { useremail } = req.params;
    try{
        const user = await users.findOne({
            where: { Email: useremail } // Specify the useremail as a search condition
        });
        if(user.length !==0){
            res.json({proceed:false})
        }
        else{
            res.json({proceed:true})
        }
    }catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
})
router.post("/:useremail/read",async(req,res)=>{
    try {
        const { useremail } = req.params; // Get the useremail from the request URL

        // Use Sequelize to find the user by their useremail
        const user = await users.findOne({
            where: { Email: useremail } // Specify the useremail as a search condition
        });

        if (!user) {
            // If no user with the specified useremail is found, return a 404 response
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Send the retrieved user as a JSON response
        res.json(user);
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
});
router.post("/signup", async (req, res) => {
    try {

        const Data=req.body
        // Hash the password and wait for it to complete
        Data.password = await hashPassword(Data.password);
        const User = {
            Username:Data.name,
            Email:Data.email,
            Password:Data.password,
            SID:generateToken(Data.name)
        }
        // Insert the random user into the 'users' table
        await users.create(User);

        res.json({ message: "Random user created successfully.", token: User.SID,User });
    } catch (error) {
        console.error("Error creating random user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/:username/delete", async (req, res) => {
    try {
        const { username } = req.params; // Get the username from the request URL

        // Use Sequelize to find and delete the user by their username
        const deletedUser = await users.destroy({
            where: { Username: username } // Specify the username as a delete condition
        });

        if (!deletedUser) {
            // If no user with the specified username is found, return a 404 response
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Send a success message as a JSON response
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/:useremail/update", async (req, res) => {
    try {
        const { useremail } = req.params; // Get the useremail from the request URL
        const updatedUserData = req.body; // Get the updated user data from the request body
        const updatedUserDataGood={
            Username:updatedUserData.username,
            Email:updatedUserData.email
        }
        // Use Sequelize to find the user by their useremail and update their data
        const [updatedRowsCount] = await users.update(updatedUserDataGood, {
            where: { Email: useremail } // Specify the useremail as an update condition
        });

        if (updatedRowsCount === 0) {
            // If no user with the specified useremail is found, return a 404 response
            res.status(404).json({ error: "User not found",status:false });
            return;
        }

        // Send a success message as a JSON response
        res.json({ message: "User updated successfully",status:true });
    } catch (error) {
        console.error("Error updating user:", error,);
        res.status(500).json({ error: "Internal server error ",status:false  });
    }
});



module.exports=router;
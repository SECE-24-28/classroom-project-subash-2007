const mongoose = require("mongoose");
const User = require("./src/models/userModel");
const connectDB = require("./src/config/db");
require("dotenv").config();

const test = async () => {
    await connectDB();

    try {
        // Drop phone index if exists
        try {
            await User.collection.dropIndex("phone_1");
            console.log("Dropped phone_1 index");
        } catch (e) {
            console.log("Index might not exist or other error:", e.message);
        }

        const user = new User({
            name: "Test Script User",
            email: "script_test" + Date.now() + "@example.com",
            password: "Password123"
        });

        console.log("Saving user...");
        await user.save();
        console.log("User saved successfully!");

        console.log("Testing password comparison...");
        const isMatch = await user.comparePassword("Password123");
        console.log("Password match:", isMatch);

    } catch (error) {
        console.error("Error saving user:", error);
    } finally {
        mongoose.connection.close();
    }
};

test();

import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const exist = await userModel.findOne({ email: email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a valid password" });
        }

        // Generate salt and hash password
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(password, salt, async (error, hash) => {
                let newUser = await userModel.create({
                    name: name,
                    email: email,
                    password: hash,
                })
                const user = await newUser.save();
                // Generate JWT token
                const token = jwt.sign({ email: email, userId: user._id }, process.env.JWT_SECRET);
                // res.cookies("token", token);
                res.json({ success: true, token })
            })
        })

    } catch (error) {
        // console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" });
        }
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                const token = jwt.sign({ email: email, userId: user._id }, process.env.JWT_SECRET);
                res.json({ success: true, token })
            } else {
                res.json({ success: false, message: "Invalid Credentials" })
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res, json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin };



import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

// route for userLogin
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // checking if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist." });
        }
        // validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        // validating password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }   
        // checking password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }
        // creating token
        const token = createToken(user._id);
        res.json({ message: "User logged in successfully.", token, user: { name: user.name, email: user.email} });

        
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error logging in user." });
        
    }
};

// route for userRegister
export const registerUser = async (req, res) => {
    try {
        const {name,email,password}= req.body;
        // checking user already exists or not 
        const exists=await userModel.findOne({email});
        if(exists){
            return res.status(400).json({ message: "User already exists." });
        }
        // validating email format
        if(!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        // validating password length
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();

        // creating token
        const token = createToken(user._id);

        res.json ({ message: "User created successfully.", token });  
    } 
        catch (error) {
  console.error("Registration Error:", error);
  res.status(500).json({ message: "Error registering user." });
}    
    }

// route for adminLogin
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const payload = { email, role: "admin" };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });

            res.json({ message: "Admin logged in successfully.", token });
        } else {
            return res.status(400).json({ message: "Invalid admin credentials." });
        }

    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: "Error logging in admin." });
    }
};


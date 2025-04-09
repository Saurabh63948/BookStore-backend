import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';  // Importing jwt to generate token

// SignUp route
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login route with JWT token generation
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id },
      'your_secret_key',  // Replace with a secure secret key
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    // Send user details along with the token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isHost: user.isHost,
      createdAt: user.createdAt,
      token: token  // Sending token in response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

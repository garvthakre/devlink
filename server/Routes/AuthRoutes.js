const express = require("express");
const bcrypt = require("bcryptjs"); // ✅ Corrected bcrypt import
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // ✅ Corrected model import
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email }); // ✅ Corrected findOne()
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword }); // ✅ Corrected model usage
        await user.save();

        res.json({ message: "User Registered Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }); // ✅ Corrected findOne()
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user }); // ✅ Added response
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;

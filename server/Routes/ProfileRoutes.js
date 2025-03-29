const express = require("express");
const Profile = require("../models/Profile"); // ✅ Correct import
const auth = require("../middleware/authMiddleware"); // ✅ Use correct middleware
const router = express.Router();

router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", "name email");

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { bio, skills, socialLinks } = req.body;

        let profile = await Profile.findOne({ user: req.user.id }); // ✅ Corrected `Profile.findOne()`

        if (profile) {
            profile.bio = bio;
            profile.skills = skills;
            profile.socialLinks = socialLinks;
        } else {
            profile = new Profile({ user: req.user.id, bio, skills, socialLinks }); // ✅ Corrected `new Profile(...)`
        }

        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Get all profiles
router.get("/all", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", "name");
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;

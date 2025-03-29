import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyProfile() {
    const [profile, setProfile] = useState({
        name: "",
        bio: "",
        skills: "",
        github: "",
        linkedin: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Fetch logged-in user's profile
        axios.get("http://localhost:3000/api/profile/me", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(res => {
            setProfile({
                name: res.data.user?.name || "",
                bio: res.data.bio || "",
                skills: res.data.skills?.join(", ") || "",
                github: res.data.socialLinks?.github || "",
                linkedin: res.data.socialLinks?.linkedin || ""
            });
        })
        .catch(err => console.log("No profile found", err));
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/profile", {
                bio: profile.bio,
                skills: profile.skills.split(",").map(skill => skill.trim()),
                socialLinks: { github: profile.github, linkedin: profile.linkedin }
            }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

            navigate("/profile/me");
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">My Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input className="border p-2 w-full" type="text" name="name" value={profile.name} readOnly />
                <textarea className="border p-2 w-full" name="bio" placeholder="Bio" value={profile.bio} onChange={handleChange} />
                <input className="border p-2 w-full" type="text" name="skills" placeholder="Skills (comma-separated)" value={profile.skills} onChange={handleChange} />
                <input className="border p-2 w-full" type="text" name="github" placeholder="GitHub Link" value={profile.github} onChange={handleChange} />
                <input className="border p-2 w-full" type="text" name="linkedin" placeholder="LinkedIn Link" value={profile.linkedin} onChange={handleChange} />
                <button className="bg-blue-600 text-white px-4 py-2">Save Changes</button>
            </form>
        </div>
    );
}

export default MyProfile;

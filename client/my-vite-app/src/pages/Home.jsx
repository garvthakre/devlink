import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState("");
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    useEffect(() => {
        axios.get("http://localhost:3000/api/profiles/all")
            .then(res => setProfiles(Array.isArray(res.data) ? res.data : []))
            .catch(err => console.log(err));
    }, []);

    // ✅ Filter profiles based on search input
    const filteredProfiles = profiles.filter(profile =>
        profile.user?.name.toLowerCase().includes(search.toLowerCase()) ||
        profile.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Developer Profiles</h1>

            {/* ✅ Search Input */}
            <input
                type="text"
                placeholder="Search by name or skills..."
                className="border p-2 w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* ✅ Show "My Profile" button if logged in */}
            {token && (
                <Link to="/profile" className="bg-green-500 text-white px-4 py-2 block text-center mb-4">
                    My Profile
                </Link>
            )}

            {/* ✅ Display Filtered Profiles */}
            {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                    <div key={profile._id} className="p-4 border-b">
                        <h2 className="text-xl">{profile.user?.name || "Unknown User"}</h2> 
                        <p>{profile.bio}</p>
                        <p><strong>Skills:</strong> {profile.skills.join(", ")}</p>
                        <Link to={`/profile/${profile._id}`} className="text-blue-500">
                            View Profile
                        </Link>
                    </div>
                ))
            ) : (
                <p>No profiles found.</p>
            )}
        </div>
    );
}

export default Home;

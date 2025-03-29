import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, CardHeader, Typography, CircularProgress, Alert, Chip, IconButton } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Close as CloseIcon, GitHub, LinkedIn } from "@mui/icons-material";
import axios from "axios";

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    skills: [],
    socialLinks: { github: "", linkedin: "" }
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3000/api/profiles/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      setProfile(res.data);
      setIsLoading(false);
    })
    .catch(err => {
      setError(err.response?.data?.message || "Failed to load profile");
      setIsLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    setProfile(prev => ({
      ...prev,
      skills: e.target.value.split(",").map(skill => skill.trim()).filter(skill => skill !== "")
    }));
  };

  const handleSocialChange = (platform, value) => {
    setProfile(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [platform]: value } }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:3000/api/profiles", profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setEditMode(false);
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      setIsLoading(false);
    }
  };

  if (isLoading) return <CircularProgress className="m-auto" />;

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, boxShadow: 3 }}>
      <CardHeader
        title="My Professional Profile"
        action={!editMode && (
          <IconButton onClick={() => setEditMode(true)}>
            <EditIcon color="primary" />
          </IconButton>
        )}
      />
      <CardContent>
        {error && <Alert severity="error">{error}</Alert>}

        {editMode ? (
          <>
            <TextField fullWidth label="Full Name" name="name" value={profile.name} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth multiline rows={3} label="Professional Bio" name="bio" value={profile.bio} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Skills (comma-separated)" value={profile.skills.join(", ")} onChange={handleSkillsChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="GitHub Profile URL" value={profile.socialLinks.github} onChange={(e) => handleSocialChange('github', e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth label="LinkedIn Profile URL" value={profile.socialLinks.linkedin} onChange={(e) => handleSocialChange('linkedin', e.target.value)} sx={{ mb: 2 }} />
            <Button onClick={handleSave} variant="contained" color="primary" startIcon={<SaveIcon />} sx={{ mr: 2 }}>Save</Button>
            <Button onClick={() => setEditMode(false)} variant="outlined" startIcon={<CloseIcon />}>Cancel</Button>
          </>
        ) : (
          <>
            <Typography variant="h5">{profile.name}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>{profile.bio}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Skills</Typography>
            <div>{profile.skills.map((skill, index) => <Chip key={index} label={skill} sx={{ m: 0.5 }} />)}</div>
            <div className="flex space-x-3 mt-3">
              {profile.socialLinks.github && <IconButton component="a" href={profile.socialLinks.github} target="_blank"><GitHub /></IconButton>}
              {profile.socialLinks.linkedin && <IconButton component="a" href={profile.socialLinks.linkedin} target="_blank"><LinkedIn /></IconButton>}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfilePage;

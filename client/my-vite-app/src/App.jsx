 import React from "react";
 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup"
import ProfileForm from "./pages/ProfileForm";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import LandingPage from "./pages/Landing";
 function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/home" element = {<Home/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/profile" element = {<ProfileForm/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path="/myprofile" element ={<MyProfile/>}/>
        <Route path="/" element ={<LandingPage/>}/>
      </Routes>
    </Router>



  )



 }
 export default App;
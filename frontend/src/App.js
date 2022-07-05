import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Feed from './pages/Feed/feed';
import FindFriends from './pages/FindFriends/findfriends';
import Profile from './pages/Profile/profile';
import EditProfile from './pages/Profile/EditProfile/editProfile';
import withAuth from './components/withAuth';
import React from 'react';
import SignIn from './pages/Login/signin';



const AuthenticatedFeed = withAuth(Feed)

function App() {
  return (
  <BrowserRouter>
   <Routes>
      <Route path="/feed" element={<Feed/>} />
      <Route path="/findfriends" element={<FindFriends/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/" element={<SignIn />} />
   </Routes>
 </BrowserRouter>
  );
}

export default App;

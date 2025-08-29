import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


function Home() {
  const navigate = useNavigate();


  
  function newUser() {
    navigate("/addUser");
  }
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  

const handleLogin=(e)=>{
  e.preventDefault();
   const savedData=JSON.parse(localStorage.getItem("users"))||[]
console.log("SavedData from localStorage:", savedData);

  const foundUser=savedData.find(
    (u)=>(u.email === email && u.password === password) || 
    (u.groupEmail === email && u.groupPassword === password))

 if (foundUser) {
    localStorage.setItem("loggedUser", JSON.stringify(foundUser));


     if (foundUser.email) {
      // individual user
      navigate(`dashboardofuser/${foundUser.name}`);
    } else if (foundUser.groupEmail) {
      // group user
      navigate(`dashboardofgroup/${foundUser.groupName}`);
    }
  } else {
    alert("Invalid Email Or Password");
  }
  

}

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Enter Your Email Id"
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="button"
          value="Login"
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-4 cursor-pointer"

        />
        <input
          type="button"
          onClick={newUser}
          value="New User"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
        />
      </div>
    </div>
    </>
  );
}

export default Home;

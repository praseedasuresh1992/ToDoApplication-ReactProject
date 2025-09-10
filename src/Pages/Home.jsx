import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedData = useSelector((state) => state.users.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false); // theme state

  // navigate to the page of adding Individual user
  function newUser() {
    navigate("/addUser");
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = savedData.find(
      (u) =>
        (u.email === email && u.password === password) ||
        (u.groupEmail === email && u.groupPassword === password)
    );

    if (foundUser) {
      dispatch(login(foundUser));

      if (foundUser.email) {
        navigate(`dashboardofuser/${foundUser.name}`);
      } else if (foundUser.groupEmail) {
        navigate(`dashboardofgroup/${foundUser.groupName}`);
      }
    } else {
      alert("Invalid Email Or Password");
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex flex-col items-center justify-center h-screen bg-blue-200 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-lg shadow bg-gray-200 dark:bg-gray-700 dark:text-white hover:scale-105 transition"
          >
            {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>
        </div>

        {/* Wrapper for Image + Form */}
        <div className="flex w-3/4 max-w-4xl bg-blue-100 text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
          {/* Left Side Image */}
          <img
            src="./HomePageImage.jpg"
            alt="HomeBanner"
            className="w-1/2 object-cover"
          />

          {/* Right Side Form */}
          <div className="w-1/2 flex flex-col justify-center p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <input
              type="email"
              placeholder="Enter Your Email Id"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="button"
              value="Login"
              onClick={handleLogin}
              className="w-full bg-blue-300 font-bold text-black dark:bg-gray-700 dark:text-white py-2 rounded-lg hover:bg-blue-700 transition mb-4 cursor-pointer"
            />
            <input
              type="button"
              onClick={newUser}
              value="New User"
              className="w-full bg-green-400 text-black py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

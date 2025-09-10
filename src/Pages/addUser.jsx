import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addIndividuals, addGroups } from "../redux/slice";
import { v4 as uuidv4 } from "uuid";

function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = useSelector((state) => state.users);

  const [user, setUser] = useState("");

  // Individual state
  const [name, setName] = useState(storedUser?.individual?.name || "");
  const [email, setEmail] = useState(storedUser?.individual?.email || "");
  const [password, setPassword] = useState(storedUser?.individual?.password || "");

  // Group state
  const [groupName, setGroupName] = useState(storedUser?.group?.groupName || "");
  const [groupRepName, setGroupRepName] = useState(storedUser?.group?.groupRepName || "");
  const [groupEmail, setGroupEmail] = useState(storedUser?.group?.groupEmail || "");
  const [groupPassword, setGroupPassword] = useState(storedUser?.group?.groupPassword || "");

  // Theme state
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const resetForm = () => {
    if (user === "new") {
      setName("");
      setEmail("");
      setPassword("");
    } else if (user === "group") {
      setGroupName("");
      setGroupRepName("");
      setGroupEmail("");
      setGroupPassword("");
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  // Validation helpers
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

  const validateIndividualForm = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return false;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return false;
    }
    if (!isValidPassword(password)) {
      alert("Password must be at least 6 characters and include uppercase, lowercase, and a number.");
      return false;
    }
    return true;
  };

  const validateGroupForm = () => {
    if (!groupName.trim() || !groupRepName.trim() || !groupEmail.trim() || !groupPassword.trim()) {
      alert("Please fill all fields");
      return false;
    }
    if (!isValidEmail(groupEmail)) {
      alert("Please enter a valid group email");
      return false;
    }
    return true;
  };

  const addIndividualUser = (e) => {
    e.preventDefault();
    if (!validateIndividualForm()) return;

    dispatch(addIndividuals({ id: uuidv4(), name, email, password, type: "individual" }));
    alert("Individual added successfully!");
    resetForm();
  };

  const addGroupUser = (e) => {
    e.preventDefault();
    if (!validateGroupForm()) return;

    dispatch(
      addGroups({
        id: uuidv4(),
        groupName,
        groupRepName,
        groupEmail,
        groupPassword,
        type: "group",
      })
    );
    alert("Group added successfully!");
    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-8 transition-colors duration-300">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Add User
        </h1>

        {/* User type selection */}
        <div className="flex justify-center mb-6 space-x-6">
          <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
            <input
              type="radio"
              name="userType"
              value="new"
              checked={user === "new"}
              onChange={(e) => setUser(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span>Individual</span>
          </label>

          <label className=" flex items-center space-x-2 text-gray-700 dark:text-gray-200">
            <input
              type="radio"
              name="userType"
              value="group"
              checked={user === "group"}
              onChange={(e) => setUser(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span>Group</span>
          </label>
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition mb-6"
        >
          Back
        </button>

        {/* Individual Form */}
        {user === "new" && (
          <form onSubmit={addIndividualUser} className="space-y-4">
            <input
              type="text"
              value={name}
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              value={email}
              placeholder="Enter Your Email Id"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="password"
              value={password}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Reset
              </button>
            </div>
          </form>
        )}

        {/* Group Form */}
        {user === "group" && (
          <form onSubmit={addGroupUser} className="space-y-4">
            <input
              type="text"
              value={groupName}
              placeholder="Enter The Group Name"
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              value={groupRepName}
              placeholder="Enter Representative Name"
              onChange={(e) => setGroupRepName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              value={groupEmail}
              placeholder="Enter Email"
              onChange={(e) => setGroupEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="password"
              value={groupPassword}
              placeholder="Enter Password"
              onChange={(e) => setGroupPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Reset
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddUser;

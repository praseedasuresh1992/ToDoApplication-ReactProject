import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIndividuals, addGroups } from "../redux/slice";

function AddUser() {
    function alertForAdd(){
        alert("successfull added")
    }
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.users);

  const [user, setUser] = useState("");

  // Individual state
  const [name, setName] = useState(storedUser?.individual?.name || "");
  const [email, setEmail] = useState(storedUser?.individual?.email || "");
  const [password, setPassword] = useState(storedUser?.individual?.password || "");

  // Group state
  const [groupName, setGroupName] = useState(storedUser?.group?.groupName || "");
  const [membersCount, setMembers] = useState(storedUser?.group?.membersCount || "");
  const [repName, setRepName] = useState(storedUser?.group?.repName || "");
  const [groupEmail, setGroupEmail] = useState(storedUser?.group?.groupEmail || "");
  const [groupPassword, setGroupPassword] = useState(storedUser?.group?.groupPassword || "");

  const addIndividualUser = (e) => {
    e.preventDefault();
    dispatch(addIndividuals({ name, email, password }));
    console.log(localStorage.getItem("users"));
  };

  const addGroupUser = (e) => {
    e.preventDefault();
    dispatch(addGroups({ groupName, membersCount, repName, groupEmail, groupPassword }));
    console.log(localStorage.getItem("users"));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add User</h2>

      {/* Radio buttons */}
      {/* radiobutton  for Individual user */}
      <div className="flex justify-center mb-6 space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="userType"
            value="new"
            checked={user === "new"}
            onChange={(e) => setUser(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-gray-700">Individual</span>
        </label>
{/*radio button  for Groups */}
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="userType"
            value="group"
            checked={user === "group"}
            onChange={(e) => setUser(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-gray-700">Group</span>
        </label>
      </div>

      {/* Individual Form */}
      {user === "new" && (
        <form onSubmit={addIndividualUser} className="space-y-4">
          <input
            type="text"
            value={name}
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            placeholder="Enter Your Email Id"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            onClick={alertForAdd}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
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
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={membersCount}
            placeholder="Enter number of members"
            onChange={(e) => setMembers(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={repName}
            placeholder="Enter Representative Name"
            onChange={(e) => setRepName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={groupEmail}
            placeholder="Enter Email"
            onChange={(e) => setGroupEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={groupPassword}
            placeholder="Enter Password"
            onChange={(e) => setGroupPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            onClick={alertForAdd}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
}

export default AddUser;

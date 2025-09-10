import React from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice"; // adjust path to your slice

function GroupHome() {
  const { groupName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to login page
  };

  return (
    <div className="min-h-screen bg-blue-200 dark:bg-gray-900 px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Hello, {groupName} 👋
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold
                     hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link
          to="manageGroup"
          className="flex-1 text-center bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold
                     hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          Manage Profile
        </Link>

        <Link
          to="ManageGroupTask"
          className="flex-1 text-center bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold
                     hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          Add Task
        </Link>

        <Link
          to="taskList"
          className="flex-1 text-center bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold
                     hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          Task List
        </Link>
      </div>

      {/* Child Routes */}
      <div className="bg-blue-200 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default GroupHome;

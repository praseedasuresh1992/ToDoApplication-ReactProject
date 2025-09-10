import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice";

function IndividualHome() {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (!loggedUser || loggedUser?.name !== name) {
      navigate("/");
    }
  }, [loggedUser, name, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4
                    dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 sm:p-10 
                      w-full max-w-md text-center transition-colors duration-300 space-y-6">

        {/* Greeting */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold 
                       text-gray-800 dark:text-gray-200">
          Hello, {name} 👋
        </h1>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white 
                     px-4 py-2 sm:py-3 rounded-lg font-medium 
                     transition-colors duration-300"
        >
          Logout
        </button>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <Link
            to="/dayPlanner"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                       py-2 sm:py-3 px-4 rounded-lg font-medium 
                       dark:bg-blue-500 dark:hover:bg-blue-600 
                       transition-colors duration-300"
          >
            Add Task
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IndividualHome;

import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function IndividualHome() {
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser || loggedUser.name !== name) {
      alert("Please Login First");
      navigate("/");
    }
  }, [name, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Hello, {name} 👋
        </h1>

        <div className="flex flex-col gap-4">
          <Link
            to="/dayPlanner"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Plan a Day
          </Link>
          <Link
            to="/weekPlanner"
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Plan a Week
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IndividualHome;

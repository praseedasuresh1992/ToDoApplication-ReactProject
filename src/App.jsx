import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import AddUser from "./Pages/addUser";
import IndividualHome from "./Pages/IndividualHome";
import GroupHome from "./Pages/Groups/groupHome";
import ManageGroup from "./Pages/Groups/ManageGroup";
import ManageGroupTask from "./Pages/Groups/ManageGroupTask";
import TaskList from "./Pages/Groups/TaskList";
import DayPlanner from "./Pages/DayPlanner";
import Rating from "./Pages/Rating";
import About from "./Pages/About";

function App() {
  // ✅ Load theme from localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // ✅ Apply theme to <html> and persist in localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ✅ Setup router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/addUser", element: <AddUser /> },
        { path: "/dashboardofuser/:name", element: <IndividualHome /> },
        {
          path: "/dashboardofgroup/:groupName",
          element: <GroupHome />,
          children: [
            { path: "manageGroup", element: <ManageGroup /> },
            { path: "ManageGroupTask", element: <ManageGroupTask /> },
            { path: "taskList", element: <TaskList /> },
          ],
        },
        { path: "/dayPlanner", element: <DayPlanner /> },
        { path: "/rate", element: <Rating /> },
        {path:"/about",element:<About/>},
      ],
    },
  ]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
     

      {/* Router */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

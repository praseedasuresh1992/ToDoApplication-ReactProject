
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { useState,useEffect } from 'react'
import Dashboard from './Pages/IndividualHome'
import AddUser from './Pages/addUser'
import Home from './Pages/Home'
import IndividualHome from './Pages/IndividualHome'
import GroupHome from './Pages/groupHome'
import DayPlanner from './Pages/DayPlanner'
import WeekPlanner from './Pages/WeekPlanner'
import Layout from './Components/Layout'

function App() {
  const [darkMode,setDarkMode]=useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: '/addUser',
          element: <AddUser />
        },
        {
          path: "/dashboardofuser/:name",
          element: <IndividualHome />
        },
        { path: "/dashboardofgroup/:groupName", element: <GroupHome /> },
        { path: '/dayPlanner', element: <DayPlanner /> },
        { path: '/weekPlanner', element: <WeekPlanner /> }
   ]}
]  )

return (

    <>
      
      {/* Dark mode container */}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white dark:bg-yellow-400 dark:text-black"
        >
          {darkMode ? "Switch to Light" : "Switch to Dark"}
        </button>
    
      {/* Router must stay */}
      <RouterProvider router={router} />

    </>
    )
    }
export default App

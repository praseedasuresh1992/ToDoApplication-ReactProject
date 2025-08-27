
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import AddUser from './Pages/addUser'

import Home from './Pages/Home'

function App() {
 const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/addUser',
    element:<AddUser/>
  }
] )

  return <RouterProvider router={router} />
}

export default App

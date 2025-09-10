import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-cyan-400 sticky top-32 z-40 text-blue-900  py-3 ">
      <div className="max-w-6xl mx-auto text-2xl  flex justify-center space-x-26">
        <Link 
          to="/about" 
          className="hover:text-yellow-400 transition-colors duration-200 text-2xl font-semibold"
        >
          Know more About us
        </Link>
        <Link 
          to="/rate" 
          className="hover:text-yellow-400 transition-colors duration-200 text-2xl font-semibold"
        >
          Rate Us
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

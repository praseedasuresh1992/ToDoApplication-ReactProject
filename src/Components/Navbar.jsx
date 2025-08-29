import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-center space-x-8">
        <Link 
          to="/about" 
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          Know more About us
        </Link>
        <Link 
          to="/rate" 
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          Rate Us
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

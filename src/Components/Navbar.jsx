import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-cyan-400 sticky top-32 z-50 text-blue-900  py-3 shadow-md">
      <div className="max-w-6xl mx-auto t ext-2xl  flex justify-center space-x-16">
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

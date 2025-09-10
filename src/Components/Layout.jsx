import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import ThemeToggle from '../Pages/Theme'


function Layout() {
  return (
    <div>
      <Header/>
      <Navbar/>
      <ThemeToggle/>
     <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
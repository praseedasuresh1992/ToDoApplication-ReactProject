import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'


function Layout() {
  return (
    <div>
      <Header/>
      <Navbar/>
     <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
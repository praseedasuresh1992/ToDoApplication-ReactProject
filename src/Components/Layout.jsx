import React from 'react'
import {outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'


function Layout() {
  return (
    <div>
      <Header/>
      <Navbar/>
      <outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
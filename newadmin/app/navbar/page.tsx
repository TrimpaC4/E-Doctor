import React from 'react'
import Image from 'next/image'
import img from './admin.png'
import Homee from '../homee/page';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: 'teal' }}>
      <div className="container-fluid">
      <Homee />
        <span className="navbar-brand mb-0 h1">
          Welcome Bango
          <Image src={img} alt="Admin" width={30} height={30} className="d-inline-block align-text-top ms-2" />
        </span>
      </div>
    </nav>
  )
}

export default Navbar
import React, { useState, useEffect } from 'react'
import '../css/navbar.css'
import logo from '../img/logonetflix.png'
import avatar from '../img/avatar.png'

function Navbar() {

    return (
        <div className="navbar">
            <img className="logo" src={logo} alt="" />
            <img className="avatar" src={avatar} alt="" />

        </div>
    )
}

export default Navbar

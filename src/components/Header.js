import React, {useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [active, setActive] = useState("home");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setActive("home");
        } else if (location.pathname === "/add") {
            setActive("addContact");
        } else if (location.pathname === "/about") {
            setActive("about");
        }
    }, [location]);

  return (
    <div className="header">
        <p className="logo">Contact App</p>
        <div className="header-right">
            <Link to="/" className={active === "home" ? "active" : ""} onClick={() => setActive("home")}>Home</Link>
            <Link to="/add" className={active === "addContact" ? "active" : ""} onClick={() => setActive("addContact")}>Add Contact</Link>
            <Link to="/about" className={active === "about" ? "active" : ""} onClick={() => setActive("about")}>About</Link>
        </div>

      
    </div>
  )
}

export default Header

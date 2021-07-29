import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import starsandstarslogo from '../../logo starsandstarstrimmed.gif'

const Navbar = (props) => {
  return (
    <nav>
        <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        <img className='logo' src={starsandstarslogo} alt=""/>   
        </Link>

      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to={"/myconstellation"} className="authLink">
              My Constellation
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>

           
        

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

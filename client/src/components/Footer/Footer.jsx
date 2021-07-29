import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
// import SuggestionForm from "../SuggestionForm";



const Footer = (props) => {
  return (
    <footer>
        {/* <SuggestionForm/> */}
      {/* <Link to={PATHS.HOMEPAGE} className="footer__name">
        {CONSTS.CAPITALIZED_APP} - created with Love by Victor, Sebas and Lau <3 
      </Link>

      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
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
      </div> */}
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
      <div className="nav">

        {/* <div className="lock-up"> */}
          <Link to={`/`}> <h5>snappr!</h5> </Link>
        {/* </div> */}

        <div className="nav-buttons-align">
          <div>
            <Link to={"/gallery"} className="nav-button">Gallery</Link>
            <Link to={"/snap"} className="nav-button">Snap</Link>
          </div>

          <div>
            <Link to={"/auth/login"} className="nav-button">Login </Link>
            <Link to={"/auth/register"} className="nav-button">Register</Link>
          </div>
        </div>

      </div>
  )
};

export default Nav;
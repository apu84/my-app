import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
        <nav>
          <ul className="menu">
            <li className="logo">
              <Link to="/">My app</Link>
            </li>
            <li className="item">
              <Link to="/new-post">Create post</Link>
            </li>
          </ul>
        </nav>
    );
  }
}

export default Navbar;
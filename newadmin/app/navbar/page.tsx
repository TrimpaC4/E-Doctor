import React from "react";
import Image from "next/image";
import img from "./admin.png";
import Homee from "../homee/page";
import navStyle from "../navbar/navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={navStyle.nav_main_container}>
      <div>
        <ul className="bb">
          <div>
            <li>dashboard</li>
          </div>
          <div>
            <li>dashboard</li>
          </div>
          <div>
            <li>dashboard</li>
          </div>
          <div>
            <li>dashboard</li>
          </div>
          <div>
            <li>dashboard</li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

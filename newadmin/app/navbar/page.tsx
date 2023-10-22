import React from "react";
import Image from "next/image";
import img from "./admin.png";
import Homee from "../homee/page";
import navStyle from "../navbar/navbar.module.css";
import stateIcon from "../../app/assets/state.png"
import PatientIcon from "../../app/assets/patiente.png"
import DoctortIcon from "../../app/assets/nurse.png"
import SettingIcon from "../../app/assets/setting.png"
import LogoutIcon from "../../app/assets/exit.png"


const Navbar: React.FC = () => {
  return (
    <nav className={navStyle.nav_main_container}>
      <div>
        <ul className={navStyle.navLists}>
          <div>
            <Image className={navStyle.iconsNav} src={stateIcon} alt="" />
            <li>statistics</li>
          </div>
          <div>
          <Image className={navStyle.iconsNav} src={PatientIcon} alt="" />
            <li>Patients</li>
          </div>
          <div>
          <Image className={navStyle.iconsNav} src={DoctortIcon} alt="" />
            <li>Doctors</li>
          </div>
          <div>
          <Image className={navStyle.iconsNav} src={SettingIcon} alt="" />
            <li>Setting</li>
          </div>
          <div>
          <Image className={navStyle.iconsNav} src={LogoutIcon} alt="" />
            <li>Logout</li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

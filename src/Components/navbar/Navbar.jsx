import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import LanguageSelector from "../language_selector/LanguageSelector";
import './Navbar.scss';
import logo from "../../assets/logo_header.svg"
import logoMobile from "../../assets/logoMobile.png"
import hamburger from "../../assets/hamburger.svg"
import { useState } from "react";

const Navbar = () => {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  }
  return (
    <nav>
      <div className="logo_container">
        <div className="logo_box">
          <picture>
            <source media="(max-width: 480px)" srcSet={logoMobile} />
            <img src={logo} alt="Logo Ela Social" />
          </picture>
          <button className="btn_hamburger" onClick={toggleMenu}>
            <img src={hamburger} alt="Open menu" className="menu_hamburger" />
          </button>
        </div>
        
      </div>
      <div className="nav__menu-container">
        <ul className="nav__menu">
          <li>
            <NavLink 
              to="/" className={({ isActive}) => isActive ? "menu active" : "menu"}>
              {t("nav.home")}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about-me" className={({ isActive }) => isActive ? "menu active" : "menu"}>
              {t("nav.about me")}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/services" className={({ isActive }) => isActive ? "menu active" : "menu"}>
              {t("nav.services")}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" className={({ isActive }) => isActive ? "menu active" : "menu"}>
              {t("nav.contact")}
            </NavLink>
          </li>
        </ul>
        <LanguageSelector />

      </div>
    </nav>
  );
};
export default Navbar;

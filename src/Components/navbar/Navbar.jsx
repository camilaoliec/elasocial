import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import LanguageSelector from "../language_selector/LanguageSelector";
import './Navbar.scss';
import logo from "../../assets/logo_header.svg"

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <nav>
      <div className="logo">
      <img src={logo} alt="Logo Ela Social" />
    </div>
      <div className="nav__menu-container">
        <ul className="nav__menu">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive}) => isActive ? "menu active" : "menu"}>
              {t("nav.home")}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about-me" 
              className={({ isActive }) => isActive ? "menu active" : "menu"}>
              {t("nav.about me")}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/services"
              className={({ isActive }) => isActive ? "menu active" : "menu"}>
              {t("nav.services")}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact"
              className={({ isActive }) => isActive ? "menu active" : "menu"}>
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

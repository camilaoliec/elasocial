import React from 'react'
import { useTranslation } from 'react-i18next'
import "../footer/Footer.scss"
import logoFooter from "../../assets/logo_footer.svg"
import instagram from "../../assets/icon-instagram.svg"
import facebook from "../../assets/icon-facebook.svg"
import linkedin from "../../assets/icon-linkedin.svg"

const Footer = () => {
    const { t } = useTranslation()
  return (
    <footer>
      <img src={logoFooter} alt="" />
      <div className="footer__texts">
        <p className='footer__texts-description'>{t("footer.description")}</p>
        <p className='footer__texts-copyright'>© 2025 Ana Rosewarne | ElaSocial. {t("footer.copyright")}</p>
      </div>
      <div className="footer__links">
        <img src={instagram} alt="" />
        <img src={facebook} alt="" />
        <img src={linkedin} alt="" />
    </div>
    </footer>
  )
}

export default Footer

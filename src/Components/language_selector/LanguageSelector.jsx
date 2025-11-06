import React from "react";
//import { useTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import './LanguageSelector.scss'

export default function LanguageSelector(){
    const { i18n } = useTranslation()
    const currentLang = i18n.language || "pt";
    
    const toggleLanguage = () => {
         const newLang = currentLang === "pt" ? "en" : "pt";
         i18n.changeLanguage(newLang)
    }
    
    return (
        <div className="box_language-selector" onClick={toggleLanguage}>
            <p className={currentLang === "pt" ? "active" : ""}>PT</p>
            <div className={`language-selector ${currentLang}`}>
                <div className="selector"></div>
            </div>
            <p className={currentLang === "en" ? "active" : ""}>EN</p>
        </div>
    )
}
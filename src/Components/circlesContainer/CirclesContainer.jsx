import CircleLink from "../CircleLink.jsx/circleLink";
import { useTranslation } from "react-i18next";
import "./CirclesContainer.scss"

import img_services from "../../assets/img_circle-services.webp"
const CirclesContainer = () => {
    const { t } = useTranslation()
    const pages = [
        { to: '/about-me', imgSrc: img_services, imgAlt:"Services", label: t("home.section-presentation.circle-caption.about")},
        { to: '/services', imgSrc: img_services, imgAlt:"Services", label: t("home.section-presentation.circle-caption.services")},
        { to: '/contact', imgSrc: img_services, imgAlt:"Services", label: t("home.section-presentation.circle-caption.contact")}
    ]
    return (
        <div className="circle_container">
            {pages.map((page,index) => (
                <CircleLink key={index}
                {...page} />
            ))}
        </div>
    )
}

export default CirclesContainer;
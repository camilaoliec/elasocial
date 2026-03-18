import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import "./CircleLink.scss"

const CircleLink =({
    to,
    imgSrc,
    imgAlt,
    label,
}) => (
        <Link to={to} aria-label={`Ir para a pagina ${label}`} className="circle_link-anchor">
            <img src={imgSrc} alt={imgAlt} className="circle_link-img" loading="lazy"/>
        <p className="circle_link-label" to={to}>{label}</p>
        </Link>
    
);
CircleLink.propTypes = {
    to: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string,
    label: PropTypes.string.isRequired
}

export default CircleLink;
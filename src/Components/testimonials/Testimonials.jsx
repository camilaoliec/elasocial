import React from 'react'
import { useTranslation } from 'react-i18next'
import "./Testimonials.scss"
import icon_quotes from "../../assets/icon_quotes.svg"

const Testimonials = () => {
    const { t } = useTranslation();
    const testimonals = t("home.section-testimonials.comments", { returnObjects: true });
  return (
    <div className="testimonial__container">
        {testimonals.map((client, index) => (
            <div key={index} className='testimonial-card'>
                <img src={icon_quotes} className='icon_quotes' alt="open quotation marks" />
                <p className="testimonial-comment">{client.comment}</p>
                <h3 className='testimonial-name'>{client.name}</h3>
                <h4 className="profession">{client.profession}</h4>
            </div>
        ))}
    </div>
  )
}

export default Testimonials

import React from 'react'
import { useTranslation } from 'react-i18next'
import "./Testimonials.scss"
import quote_left from "../../assets/icon-quote_left.svg"
import quote_right from "../../assets/close.svg"
const Testimonials = () => {
    const { t } = useTranslation();
    const testimonals = t("home.section-testimonials.comments", { returnObjects: true });
  return (
    <div className="testimonial__container">
        {testimonals.map((client, index) => (
            <div key={index} className='testimonial-card'>
                <img src={quote_left} className='quote_left' alt="open quotation marks" />
                <p className="testimonial-comment">{client.comment}</p>
                <img src={quote_right} className='quote_right' alt="close quotation mark" />
                <h3 className='testimonial-name'>{client.name}</h3>
                <h4 className="profession">{client.profession}</h4>
            </div>
        ))}
    </div>
  )
}

export default Testimonials

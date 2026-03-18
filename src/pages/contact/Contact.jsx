import React from 'react'
import Form from '../../Components/form/Form'
import ContactMe from '../../Components/contact_me/ContactMe'

const Contact = () => {
  return (
    <section className='contact__section'>
      <h1>Contact Me</h1>
      <div className="contact__section-container">
      <Form />
      <ContactMe />
      </div>
    </section>
  )
}

export default Contact

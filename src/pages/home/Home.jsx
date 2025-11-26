import React from 'react'
import { useTranslation } from 'react-i18next'
import "./Home.scss"
import Testimonials from '../../Components/testimonials/Testimonials'
import InstagramFeed from '../../Components/InstagramFeed/InstagramFeed'

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className='home'>
      <section className="work__section">
        <div className="work__title">
          <h1>{t("home.section-work.title")}</h1>
        </div>
      </section>
      <section className='testimonials__section'>
          <h1>{t("home.section-testimonials.title")}</h1>
          <Testimonials />
      </section>
      <section className="insta__section">
          <h1>Want to stalk us on Instagram?</h1>
        <InstagramFeed />
      </section>
    </div>
  )
}

export default Home

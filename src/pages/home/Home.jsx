
import { useTranslation } from 'react-i18next'
import "./Home.scss"
import Testimonials from '../../Components/testimonials/Testimonials'
import InstagramFeed from '../../Components/instaFeed/InstagramFeed'
import CirclesContainer from '../../Components/circlesContainer/CirclesContainer'
import Banner from '../../Components/banner/banner'


const Home = () => {
  const { t } = useTranslation();
  return (
    <div className='home'>
      <section className="banner__Section">
        <Banner />
      </section>
      <section className="presentation__section">
        <h1>{t("home.section-presentation.title")}</h1>
        <h2>{t("home.section-presentation.subtitle")}</h2>
        <CirclesContainer />
      </section>
      <section className='testimonials__section'>
          <h1>{t("home.section-testimonials.title")}</h1>
          <Testimonials />
      </section>
      <section className="insta__section">
          <h1>{t("home.section-instagram.title")}</h1>
        <InstagramFeed />
      </section>
    </div>
  )
}

export default Home

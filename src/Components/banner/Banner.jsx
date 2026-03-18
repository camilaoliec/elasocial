import React from 'react'
import useEmblaCarousel from "embla-carousel-react"
import { useState, useEffect, useCallback } from 'react'
import "./Banner.scss"

import arrowLeft from "../../assets/arrow-left.svg"
import arrowRight from "../../assets/arrow-right.svg"
import img1 from "../../assets/1.png"
import img2 from "../../assets/2.png"
import img3 from "../../assets/3.png"

const autoplay_interval = 4000;

const Banner = () => {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop:true })
    const [selectedIndex, setSelectedIndex] = useState(0)

    // Avancar o slide automaticamente
    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])
    // const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    // const scrollNext = () => emblaApi && emblaApi.scrollNext();

      useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        }

        emblaApi.on("select", onSelect)
        onSelect()

        return () => emblaApi.off("select", onSelect)

    }, [emblaApi])

    // autoplay
    useEffect(() => {
        if (!emblaApi) return;

        //define intervalo
        const timer = setInterval(() => {
            scrollNext();
        }, autoplay_interval);
        //limpa intervalo
        return () => {
            clearInterval(timer);
        }
    }, [emblaApi, scrollNext]);

  return (
    <div className='banner'>
        <div className="banner_container" ref={emblaRef}>
            <div className="banner_slides">
                <div className="banner_slide"><img src={img1} alt="" /></div>
                <div className="banner_slide"><img src={img2} alt="" /></div>
                <div className="banner_slide"><img src={img3} alt="" /></div>
            </div>
            <img src={arrowLeft} alt="previous" className="banner_arrow left" onClick={() => emblaApi && emblaApi.scrollPrev()} />
            <img src={arrowRight} alt="next" className="banner_arrow right" onClick={() => emblaApi && emblaApi.scrollNext()} />
        </div>
            <div className="banner_dots">
                {[0,1,2].map(i => (
                    <button key={i} className={`dot ${selectedIndex === i ? "active" : ""}`} onClick={() => emblaApi && emblaApi.scrollTo(i)}
                />
            ))}
        </div>
    </div>
  )
}

export default Banner

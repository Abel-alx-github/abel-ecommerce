import './Slider.scss'

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from './Slider-data'
import { useEffect, useState } from 'react'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderLength = sliderData.length - 1

  const nextSlide = () => {
    if (currentSlide === sliderLength) setCurrentSlide(0)
    else setCurrentSlide(currentSlide + 1) 
  }

  const prevSlide = () => {
    if (currentSlide === 0) setCurrentSlide(sliderLength)
      else setCurrentSlide(currentSlide - 1) 
  }

  const autoScroll = true;
  let slideInterval ;
  let intervalTime = 5000;

  useEffect(() => {
    setCurrentSlide(0)
  }, [])

 useEffect(() => {
  if (autoScroll) {
   const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime)
    }
   auto();
  }

    return () => clearInterval(slideInterval)
  }, [currentSlide, autoScroll, slideInterval])

  return (
    <div className="slider">
        <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
        <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

        {
          sliderData.map((slide, index) => {
            return(
              <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                {index === currentSlide && (
                  <>
                    <img src={slide.image} alt={slide.heading} />
                    <div className='content'>
                      <h1>{slide.heading}</h1>
                      <p>{slide.desc}</p>
                      <hr />
                      <a href="#product" className='--btn --btn-primary'>
                        Shop Now
                      </a>
                    </div>
                  </>
                )}
              </div>
            )
          })
        }        
        
    </div>
  )
}

export default Slider
import React, { useEffect } from 'react'
import Slider  from '../../components/Slider/Slider';
import Product from '../../components/Product/Product';

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollDownToProducts = () => {
      if(url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        })
        return;
      }
    }
    scrollDownToProducts()
  }, [url])

  return (
    <div>
      <Slider />
      <Product />
    </div>
  )
}

export default Home;
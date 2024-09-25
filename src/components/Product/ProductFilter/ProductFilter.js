import styles from './ProductFilter.module.scss'

import {selectProducts, selectMinPrice, selectMaxPrice} from '../../../redux/slice/productSlice';
import {FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE, } from '../../../redux/slice/filterSlice';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All")
  const [price, setPrice] = useState(150)

  const products = useSelector(selectProducts)
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch()

  const allCategories = [ "All", 
                          ...new Set(
                          products.map(item => item.category)
                          )
                        ];

  const allBrands = [ "All", 
                      ...new Set(
                        products.map(item => item.brand)
                      )
                    ];
  
  const filterByCategory = (cate) => {
    setCategory(cate);
    dispatch(FILTER_BY_CATEGORY({products, category: cate}))
  }

  const clearFilterd = () => {
    setBrand("All");
    setPrice(maxPrice);
    setCategory("All");
  }
  
  useEffect(() => {
          dispatch(FILTER_BY_BRAND({products, brand}))
  }, [products, brand, dispatch])

  useEffect(() => {
        dispatch(FILTER_BY_PRICE({products, price}))
  }, [products, price, dispatch])


  return (
    <div className={styles.filter}>
      <h4>Categories</h4>

      <div className={styles.category}>
        {
          allCategories.map((cate, idx) => (
              <button
              key={idx}
              type="button"
              className={`${category}` === cate ? styles.active : ""}
              onClick={() => filterByCategory(cate)}
              >
              &#8250; {cate}
              </button>
          ))
        }
      </div>
      <h4>Brand</h4>
        <div className={styles.brand}>
          <select value={brand} onChange={ (e) => setBrand(e.target.value) }>
            {
              allBrands.map((brand, idx) => {
                return <option key={idx} value={brand}>{brand}</option>
              })
            }

          </select>
       

        <h4>Price</h4>
        <p>{`${price}`}</p>
         <div className={styles.price} >
          
            <input type="range" min={minPrice} max={maxPrice} value={price} onChange={(e) => setPrice(e.target.value)} />    
          </div>
          
          <br/>
          <button className="--btn --btn-danger" onClick={clearFilterd}>Clear Filter </button>   
    </div>
    </div>
  )
}

export default ProductFilter
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../customHooks/useFetchCollection';
import styles from './Product.module.scss';
import loaderImg from "../../assetes/spinner.gif"

import React, { useEffect, useState } from 'react'
import { selectProducts, STORE_PRODUCTS, GET_PRICE_RANGE } from '../../redux/slice/productSlice';
import ProductFilter from './ProductFilter/ProductFilter';
import ProductList from './ProductList/ProductList';
import { FaCogs } from 'react-icons/fa';

const Product = () => {
    const {data, isLoading} = useFetchCollection("products")
    const [showFilter, setShowFilter] = useState(false);
    const products = useSelector(selectProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({ products: data})
        );
        // console.log( data, "===after dispatch===")
    
        dispatch(GET_PRICE_RANGE({
            products:data,
        }))
        
    }, [dispatch, data])
    
    const toggleFilter = () => {
        setShowFilter(!showFilter)
    }

    return (
        <section>
            <div className={`container ${styles.product}`}
                style={{marginBottom:"80px"}}
            >
                <aside
                    className={ showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}
                >
                    {
                        isLoading ? null : <ProductFilter />
                    }
                </aside>
                <div className={styles.content}>
                    {
                        isLoading ? (
                            <img 
                                src={loaderImg}
                                alt="Loading..."
                                style={{width: "60px"}}
                                className="--center-all"
                            />
                        ) : (
                            <ProductList products={products} />
                        )
                    }

                    <div className={styles.icon} onClick={toggleFilter}>
                        { isLoading ? "" : <FaCogs size={20} color='rgb(244, 65, 235)'/>}
                        <p>
                          {isLoading ? "" :  <b>{showFilter ? "Hide Filter": "Show Filter"}</b>}
                        </p>
                    </div>
                    </div>    

            </div>
        </section>
    )
}

export default Product
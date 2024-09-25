import styles from "./ProductDetails.module.scss"
import loaderImg from '../../../assetes/spinner.gif'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ADD_TO_CART, CALC_TOTAL_QUANTITY, DECREASE_FROM_CART, selectCartItems } from '../../../redux/slice/cartSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import useFetchDoc from '../../../customHooks/useFetchDoc';
import Card from "../../Card/Card"
import StarRate from 'react-star-rate';
import ProductRating from "../../ProductRating/ProductRating"

const ProductDetails = () => {

  // console.log("from ==========productDetail==")

  const { id } = useParams()
  const [product, setProduct] = useState(null)

  const cartItems = useSelector(selectCartItems)
  const { document } = useFetchDoc('products', id)
  const {data} = useFetchCollection('reviews')
  const dispatch = useDispatch()
  const filteredReviews = data.filter((review) => review.productID === id);
  const cartProduct = cartItems.find(item => item.id === id)
  const isProductAdded = cartItems.findIndex(item => item.id === id)

  useEffect( () => {
      setProduct(document)
      // console.log(document, "from product detaail=========document")
  }, [document])

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALC_TOTAL_QUANTITY())
  }

  const decreaseFromCart = (product) => {
      dispatch(DECREASE_FROM_CART(product))
      dispatch(CALC_TOTAL_QUANTITY())
  }

  return (
    <section style={{marginBottom:"100px"}}>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products"><button className="--btn --btn-primary">&larr; Back To Products</button></Link>
        </div>
        {product === null ? (
          <img src={loaderImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>Product ID: </b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div className={styles.count}>
                  {isProductAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseFromCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cartProduct.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <StarRate value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: { userName ?  userName  : "Anonymous" } </b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>

     
    </section>
  );
};

export default ProductDetails
import styles from './Cart.module.scss'


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALC_SUBTOTAL, CALC_TOTAL_QUANTITY, CLEAR_CART_ITEM, DECREASE_FROM_CART, REMOVE_FROM_CART, SAVE_LINK, selectCartItems, selectTotalAmount, selectTotalQuantity } from '../../redux/slice/cartSlice'
import { selectIsLoggedIn } from '../../redux/slice/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import Card from '../../components/Card/Card'


const Cart = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalQuantity = useSelector(selectTotalQuantity)
    const cartTotalAmount = useSelector(selectTotalAmount)
    const isLoaggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addToCart = (item) => {
        dispatch(ADD_TO_CART(item))
        dispatch(CALC_TOTAL_QUANTITY())
    }

    const decreaseFromCart = (item) => {
        dispatch(DECREASE_FROM_CART(item))
        dispatch(CALC_TOTAL_QUANTITY())
    }

    const removeFromCart = (item) => {
        dispatch( REMOVE_FROM_CART(item))
        dispatch(CALC_TOTAL_QUANTITY())
    }

    const clearCart = () => {
        dispatch(CLEAR_CART_ITEM())
        dispatch(CALC_TOTAL_QUANTITY())
    }

    useEffect( () => {
        dispatch(CALC_SUBTOTAL())
        dispatch(CALC_TOTAL_QUANTITY())
        dispatch(SAVE_LINK(""))

    }, [dispatch, cartItems])

    const url = window.location.href
    const checkOut = () => {
        if (isLoaggedIn) navigate("/checkout-detail")
        else {
                dispatch(SAVE_LINK(url))
                navigate("/login")
            }   
    }

    return (
    <section>
        <div className={`container ${styles.table}`}>
            <h2>Shopping Cart</h2>
            {
                cartItems.length === 0 ? (
                    <>
                        <p>Your cart is currently empty.</p>
                        <br />
                        <div>
                            <Link to="/#product" >
                                <button className='--btn --btn-primary' >&larr; Continue Shopping</button>
                             </Link>
                        </div>
                    </>
                ) : (
                    <>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <p>
                                                    <b>{item.name}</b>
                                                </p>
                                                <img src={item.imageUrl} alt={item.name} width="50px"  />
                                            </td>
                                            <td>{item.price}</td>
                                            <td>
                                                <div className={styles.count}>
                                                    <button className='--btn' onClick={() => decreaseFromCart(item)} >{" - "} </button>
                                                    {item.cartQuantity}
                                                    <button className='--btn'  onClick={() => addToCart(item)}> { " + " } </button>
                                                </div>
                                            </td>
                                            <td>{(item.price * item.cartQuantity).toFixed(2)}</td>
                                            <td className={styles.icon}>
                                                <FaTrashAlt onClick={() => removeFromCart(item)} />
                                            </td>
                                        </tr>
                                    )
                                })      
                            }
                        </tbody>
                    </table>

                            <div className={styles.summary}>
                                <button className='--btn --btn-danger' onClick={clearCart}>
                                    Clear Cart
                                </button>
                                <div className={styles.checkout}>
                                    <div>
                                        <Link to="/#products"><button className='--btn --btn-primary'> &larr; Continue Shopping</button></Link>
                                    </div>
                                    <br />
                                    <Card className={styles.card}>
                                        <p>
                                            <b>{`Cart items: ${cartTotalQuantity}`}</b>
                                        </p>
                                        <div className={styles.text}>
                                            <h4>Subtotal:</h4>
                                            <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                                        </div>
                                        <p>Tax on shipping calculated at finall checkout.</p>
                                        <button className='--btn --btn-primary --btn-block' onClick={checkOut}>checkOut</button>
                                    </Card>
                                </div>

                            </div>

                    </>
                )
            }
        </div>
    </section>
    )
}
export default Cart
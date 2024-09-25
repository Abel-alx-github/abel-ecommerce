

import { Link } from 'react-router-dom'

import {
    selectCartItems,
    selectTotalAmount,
    selectTotalQuantity,
  } from "../../redux/slice/cartSlice";
  import Card from "../Card/Card";
  import styles from "./CheckoutSummary.module.scss";
import { useSelector } from 'react-redux';

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectTotalAmount)
    const cartTotalQuantity = useSelector(selectTotalQuantity)
  
    return (
    <div>
    <h3>CheckoutSummary</h3>
        <div>
            {
                cartItems.length === 0 ? (
                    <>
                        <p>No item in your cart.</p>
                        <button className='--btn'>
                            <Link to="/#products">Back To Shopping</Link>
                        </button>
                    </>) : (
                        <div>
                            <p>
                                <b>{`Cart items : ${cartTotalQuantity} `}</b>
                            </p>

                            <div className={styles.text}>
                                <h4>Subtotal:</h4>
                                <h3>{cartTotalAmount.toFixed(2)}</h3>
                            </div>

                                { cartItems.map((item, idx) => {
                                    const {id, name, price, cartQuantity} = item;
                                    return (
                                        <Card key={id} cardClass={styles.card}>
                                            <h4>Product: {name}</h4>
                                            <p>Quantity: {cartQuantity}</p>
                                            <p>Unit Price: {price}</p>
                                            <p>Sum Price: {price * cartQuantity}</p>
                                        </Card>
                                    )
                                })}
                        </div>
                    )
            }
        </div>
    </div>
    
    
)
}

export default CheckoutSummary
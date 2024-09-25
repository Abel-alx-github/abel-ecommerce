import loaderImage from '../../assetes/spinner.gif';
import styles from './CheckoutForm.module.scss';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectShippingAddress } from '../../redux/slice/checkoutSlice';
import { selectUserID, selectEmail } from '../../redux/slice/authSlice';
import {selectTotalAmount, selectCartItems, CLEAR_CART_ITEM} from '../../redux/slice/cartSlice';
import { toast } from 'react-toastify';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import Card from '../Card/Card';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebaseConfig';

const CheckoutForm = () => {
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userID = useSelector(selectUserID);
    const userEmail = useSelector(selectEmail);
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectTotalAmount);
    const shippingAddress = useSelector(selectShippingAddress);


    useEffect( () => {
        if(!stripe) return

        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret")
        if (!clientSecret) return
    }, [stripe])

    const saveOrder = () => {
        const today = new Date()
        const date = today.toDateString()
        // extract the toda's time in time variable
        const time = new Date().toLocaleTimeString(); 

        const orderConfig = {
            userID,
            userEmail,
            orderDate: date,
            orderTime: time,
            orderAmount: cartTotalAmount,
            orderStatus: "Order Places...",
            cartItems,
            shippingAddress,
            createdAt : Timestamp.now().toDate()
        };

        try {
            addDoc(collection(db, "orders"), orderConfig)
            dispatch(CLEAR_CART_ITEM())
            // toast.success("Order saved successfuly!")
            navigate("/checkout-success")
        } catch(error) {
            toast.error(error.message)
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(null);
            // console.log("(!stripe || !elements)")
        if (!stripe || !elements) return
        setIsLoading(true)

        const confirmPayment = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:4401/checkout-success",
            },
            redirect: "if_required"
        }).then((result) => {
            if (result.error) {
                toast.error(result.error.message);
                setMessage(result.error.message)
                return;
            }
            if (result.paymentIntent) {
                if(result.paymentIntent.status === "succeeded") {
                    setIsLoading(false)
                    toast.success("Payment Successful!")
                    saveOrder();
                }
            }
        });
        setIsLoading(false)
            
    
    }
 
    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cardClass={styles.card}>
                            <CheckoutSummary />
                        </Card>
                    </div>
                    <div>
                        <Card cardClass={`${styles.card} ${styles.pay}`}>
                            <h3>Stripe Checkout</h3>
                            <PaymentElement id={styles["payment-element"]} />
                            <button
                                disabled={isLoading || !stripe || !elements}
                                id='submit'
                                className={styles.button}
                            >
                                <span id='button-text'>
                                    {
                                        isLoading ? (<img src={loaderImage} alt='Loading...' style={{width: "25px"}}/>
                                    ) : (
                                        "Pay Now"
                                    )
                                    }
                                </span>

                            </button>
                            { message && <div id={styles["payment-message"]}>{message}</div>}        
                        </Card>
                    </div>
                </form>

            </div>
        </section>
    )
}

export default CheckoutForm
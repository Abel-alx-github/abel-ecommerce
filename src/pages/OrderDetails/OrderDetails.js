import styles from './OrderDetails.module.scss'
import loaderImg from '../../assetes/spinner.gif'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDoc from "../../customHooks/useFetchDoc";


const OrderDetails = () => {
    const [orders, setOrders] = useState(null);
    const {id} = useParams();
    const {document} = useFetchDoc("orders", id);

    useEffect( () => {
        setOrders(document)
    }, [document])

    return(
        <>
        <section>
            <div className={`container ${styles.table}`}>
                <h2>Order Details</h2>
                <div>
                    <Link to="/order-history" >&larr; Back to List of Orders</Link>
                </div>
                <br />
                {
                    orders === null ? (<img src={loaderImg} alt="Loading...." style={{width: "50%"}} />)
                     :
                      (<>
                        <p><b>Order ID</b> {orders.id}</p>
                        <p><b>Order Amount</b> ${orders.orderAmount}</p>
                        <p><b>Order Status</b> {orders.orderStatus}</p>
                        <br />
                        <table>
                            <thead>
                                <th>No</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {
                                    orders.cartItems.map((item, idx) => {
                                        return(
                                            <tr key={item.idx} >
                                                <td><p><b>{idx + 1}</b></p></td>
                                                <td>
                                                    <p>
                                                        <b>{item.name}</b>
                                                    </p>
                                                    <img src={item.imageUrl} alt={item.name} 
                                                        style={{width: "100px" }}
                                                    />
                                                </td>

                                                <td><p>{item.price}</p></td>
                                                <td><p>{item.cartQuantity}</p></td>
                                                <td>{(item.price * item.cartQuantity).toFixed(2)}</td>
                                                <td className={styles.icons}>
                                                    <Link to={`/review-product/${item.id}`}>
                                                        <button className='--btn --btn-primary'>
                                                            Review Product
                                                        </button>
                                                    </Link>
                                                     </td>
                                                <td></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                      </>)
                }

            </div>

        </section>
        </>
    )
}


export default OrderDetails;

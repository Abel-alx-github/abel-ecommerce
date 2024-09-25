import styles from './OrderHistory.module.scss';
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { ADD_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
import { selectUserID } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";

const OrderHistory = () => {

    const { data, isLoading } = useFetchCollection("orders");
    const orders = useSelector(selectOrderHistory);
    const userID = useSelector(selectUserID)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // console.log(data,"data======+++")
    // console.log(orders, "orders-----------")
    useEffect( () => {
        dispatch(ADD_ORDERS(data));
    }, [dispatch, data]);

    const handleOnClick = (id) => {
        navigate(`/order-details/${id}`);
    };

    const filterdOrders = orders.filter(order => order.userID === userID)

    return ( 
        <>
        <section>
            <div className={`container ${styles.order}`}>
                <h2>Your Order History</h2>
                <p>Open an order to leave a <b>Product review</b></p>
                <br />
                <>
                    {isLoading && < Loader />} 
                    <div className={styles.table}>
                        {filterdOrders.length === 0 ? <p>No order found yet!!!</p> :  (
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Date</th>
                                        <th>Order ID</th>
                                        <th>Order Amount</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterdOrders.map((order, idx) => {
                                            return(
                                                <tr key={order.id} onClick={() => handleOnClick(order.id)}>
                                                    <td>{idx + 1}</td>
                                                    <td>{order.orderDate} at {order.orderTime}</td>
                                                    <td>{order.id}</td>
                                                    <td>${ order.orderAmount}</td>
                                                    <td>
                                                        <p 
                                                            className={order.orderStatus !== "Delivered" ?
                                                                `${styles.pending}` : `${styles.delivered}`
                                                            }
                                                        >
                                                            {order.orderStatus}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )}

                    </div>
                </>
            </div>
        </section>
        </>
     );
}
 
export default OrderHistory;
import styles from './ProductRating.module.scss'
import loaderImg from '../../assetes/spinner.gif'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useFetchDoc from "../../customHooks/useFetchDoc";
import { useSelector } from "react-redux";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebaseConfig/firebaseConfig";
import Card from '../../components/Card/Card'
import StarRate from 'react-star-rate';



const ProductRating = () => {
    const [rate, setRate] = useState(0);    
    const [review, setReview] = useState("")
    const [product, setProduct] = useState(null)
    const {id} = useParams();
    const {document} = useFetchDoc("products", id)
    const userName = useSelector(selectUserName);
    const userId = useSelector(selectUserID);

    const navigate = useNavigate()

    useEffect( () => {
        setProduct(document)
    }, [document])

    const sendReview = (e) => {
        e.preventDefault()
        const reviewDate = new Date().toDateString();
        const reviewConfig = {
            userId,
            userName,
            productID:id,
            rate,
            review,
            desc:review,
            reviewDate: reviewDate,
            createdAt:Timestamp.now().toDate(),
        };

        try {
            addDoc(collection(db, "reviews"), reviewConfig);
            toast.success("Review Submitted Successfully!")
            setRate(0)
            setReview("")
            navigate("/order-history")
        } catch (err) {
            toast.error(err.message)

        }

    }



    return (
    <section>
        <div className={`container ${styles.review}`}>
            <h2>Review Products</h2>
            {
                product === null ? (<img src={loaderImg} alt="loading" style={{width: "50px"}} />) 
                :
                 (<>
                    <p>
                        <b>Product name:</b> {product.name}
                    </p>
                    <img src={product.imageUrl} alt={product.name} style={{width: "100px"}} />
                 </>)
            }

            <Card cardClass={styles.card}>
                <form onSubmit={(e) => sendReview(e)}>
                    <label htmlFor="">Rating:</label>
                    < StarRate
                        value={ rate }
                        onChange={(rate) => setRate(rate)}
                    />

                    <textarea name="" id=""
                        value={review}
                        required
                        onChange={(e) => setReview(e.target.value)}
                        cols={"30px"}
                        rows={"10px"}
                    ></textarea>

                    <button
                        type='subimt'
                        className='--btn --btn-primary'
                    >Send Review</button>
                </form>
            </Card>
        </div>
    </section>
  )
}

export default ProductRating
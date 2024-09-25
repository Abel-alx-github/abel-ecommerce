import styles from './auth.module.scss';
import resetImg from  '../../assetes/forgot.png';

import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { auth } from '../../firebaseConfig/firebaseConfig';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate()

  const handleResetPassword = (e) => {
    e.preventDefault()
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
    .then( () => {
      setIsLoading(false)
      toast.success("We sent an Emaill.\nLook your email")
      navigate("/login")
    })
    .catch((error) => {
      setIsLoading(false)
      toast.error(error.message)

    })

  }
  return (
       <>
       { isLoading && <Loader />}
       <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={resetImg} alt="reset" width="400" />
            </div>
    
         <Card>
            <div className={styles.form}>
                 
                    <h2>Reset Password</h2>
                    <form onSubmit={handleResetPassword}>
                        <input type="email"
                               placeholder='Email'
                               required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               />
                        <button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>
                    
                        <div className={styles.links}>
                          <p>
                            <Link to="/login">- Login -</Link>
                          </p>
                          <p>
                            <Link to="/register">- Register -</Link>
                          </p>
                        
                        </div>
                    </form>
            </div>
        </Card>
        </section>
       </>
    
      )
}

export default Reset
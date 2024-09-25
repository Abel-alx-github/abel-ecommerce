import styles from './auth.module.scss';
import registerImg from  '../../assetes/register.png';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { useState } from 'react';

import { toast } from 'react-toastify';

import {auth} from '../../firebaseConfig/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../../components/Loader/Loader';



const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()


    const handleRegistration = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
                toast.error("Password do not match!!!")
            return
        }

        setIsLoading(true);
        
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
             setIsLoading(false)
            
              const user = userCredential.user;
              // console.log(user)
              toast.success("Registerd Successfully...")
            // wait until the success message displayed and navigate to login 
              navigate("/login") 
          })
          .catch((error) => {
            toast.error(error.message)
            setIsLoading(false);
          });

        // console.log(email, password, confirmPassword)
    }

      return (
        <>
       
       { isLoading && <Loader /> }

       <section className={`container ${styles.auth}`}>
    
         <Card>
            <div className={styles.form}>
                 
                    <h2>Register</h2>
                    <form onSubmit={handleRegistration}>
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        
                        <button type="submit" className="--btn --btn-primary --btn-block">Register</button>
                    
                    </form>
            <span className={styles.register}>
                <p>Already have an account? </p>
                <Link to="/login"> <em>Login</em></Link>
            </span>
            </div>
        </Card>
       

        <div className={styles.img}>
            <img src={registerImg} alt="register" width="400" />
        </div>

      </section>
</>
  )
}

export default Register
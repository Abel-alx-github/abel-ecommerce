
import styles from './auth.module.scss';
import loginImg from  '../../assetes/login.png';

import { toast } from 'react-toastify';

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../../firebaseConfig/firebaseConfig';

import Loader from '../../components/Loader/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password).then( userCredential => {
        // console.log( userCredential.user)
        setIsLoading(false)
        toast.success("Successefully Loggedin!!!")
        navigate("/")
      

    })
    .catch(error => {
        setIsLoading(false);
        toast.error(error.message);
    })
}    

const handleLoginWithGoogle = (e) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(res => {
        toast.success("Login Successfully...")
        navigate("/")
    })
    .catch(error => {
        toast.error(error.message);
    })
}

  return (
  <>
    { isLoading && <Loader /> }
    
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src={loginImg} alt="login" width="400" />
        </div>

     <Card>

        <div className={styles.form}>
             
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
                
                    <div className={styles.links}>
                        <span className={styles.register}>
                            <p>Forgot password ?</p><Link to="/reset"> <em>Reset Password</em></Link>
                        </span>
                    </div>
                    <p>--- Or ---</p>
                </form>
                <button className='--btn --btn-danger --btn-block'
                        onClick={handleLoginWithGoogle}
                >
                    <FaGoogle color='#fff' /> Login with Google
                </button>
        <span className={styles.register}>
            <p>Don't have an account ?</p>
            <Link to="/register"> <em>Register</em></Link>
        </span>
        </div>
    </Card>
    </section>
</>
  )
}

export default Login
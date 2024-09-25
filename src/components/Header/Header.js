import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

import { toast } from 'react-toastify';
import {auth} from '../../firebaseConfig/firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { selectEmail, selectIsLoggedIn, SET_ACTIVE_USER, SET_REMOVE_USER } from '../../redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import ShowOnLogin, { ShowOnLogout } from '../HiddenLink/HiddenLink';
import { selectTotalQuantity } from '../../redux/slice/cartSlice';

// Ziታ Millano Market | E-commerce

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        <sub>Ziታ</sub><span>Millano &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Market</span>.
      </h2>
    </Link>
</div>
)

const activeLink =  ({isActive}) =>
   (isActive ? `${styles.active}` : "")



const Header = () => {
  // identifiy who logged in
  const email = useSelector(selectEmail)
  const cartTotalQuantity = useSelector(selectTotalQuantity)

  const [showMenu, setShowMenu] = React.useState(false);
  const [name, setName] = React.useState("")
 
  const cart = (
    <span className={styles.cart}>
      <NavLink to="/cart" className={activeLink}>
          Cart
          <FaShoppingCart size={20}/>
          <p>{cartTotalQuantity}</p> 
       </NavLink>
    </span>
  )

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  const dispatch = useDispatch()
  
  useEffect(() => {
    onAuthStateChanged(auth, User => {
      if (User) {
        if (!User.displayName) {
          // create user name from email if not provided
          const lastIdx = User.email.indexOf("@")
          const nameFromEmail = User.email.substring(0, lastIdx)
          const uName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
          setName(uName)
        } else {
          // take the first name
          const userName = User.displayName.split(" ")[0]
          const uName = userName.charAt(0).toUpperCase() + userName.slice(1)
          setName(uName)
        }

        dispatch(SET_ACTIVE_USER({
          email: User.email,
          userID: User.uid,
          userName: User.displayName ? User.displayName : name,

        }))

     } else {
      dispatch(SET_REMOVE_USER()) 
      setName("")
     }
  })
  }, [dispatch, name])

  const navigate = useNavigate()

  const handleLogOut = () => {
  
    signOut(auth).then(() => {
      toast.success("Logout Successfully.")
      navigate("/")
    })
    .catch(error => {
      toast.error(error.message)
    })
  }

  return (
    <header className={styles.fixed} >
      <div className={styles.header }>
        {logo} 
     
      <nav className={
        showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
      }>
       <div className={
          showMenu ? 
          `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
           :
          `${styles["nav-wrapper"]}`
          }

          onClick={hideMenu}
          >
        </div>

        <ul onClick={hideMenu}>
          <li className={styles["logo-mobile"]}>
            {logo}
            <FaTimes size={25} color="#fff" onClick={hideMenu} />
          </li>
           <li>
           <ShowOnLogin>
             {(email === process.env.REACT_APP_ADMIN_EMAIL_ZITA || email === process.env.REACT_APP_ADMIN_EMAIL ) && <NavLink to="/admin" className={activeLink}><div style={{color:"#00ff00"}}>Admin</div></NavLink>}
            </ShowOnLogin>
           </li>
          <li>
            <NavLink to="/" className={activeLink}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={activeLink}>Contact Us</NavLink>
          </li>  
        </ul>
   
        <div className={styles["header-right"]} onClick={hideMenu}>

         <span className={styles.links}>
            <ShowOnLogout>
              <NavLink to="/login" className={activeLink}>Login</NavLink>
            </ShowOnLogout>
            <ShowOnLogin>  
                <a href="/" style={{color:"#00ff00"}}>
                   <FaUserCircle size={20} />
                   Hi, { name }
                </a>
            </ShowOnLogin>


            <ShowOnLogin>
              <NavLink to="/order-history" className={activeLink}>My orders</NavLink>
            </ShowOnLogin>

            <ShowOnLogin>
              <NavLink to="/"  onClick={ handleLogOut}>Logout</NavLink>
            </ShowOnLogin>
            </span>

           { cart }
        </div>
      </nav>
     

    <div className={styles["menu-icon"]}>
        {cart}
        <HiOutlineMenuAlt3  size={30} onClick={toggleMenu} />
    </div>
    </div>
    </header>
  )
}

export default Header
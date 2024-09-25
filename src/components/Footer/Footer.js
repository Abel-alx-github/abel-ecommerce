import React from 'react';
import styles from './Footer.module.scss';
import {FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
// import Contact from '../../pages/Contact/Contact';
import { Link } from 'react-router-dom'
const Footer = () => {
  const year = new Date().getFullYear();
  return (
  <div className={styles.footer}>
    <div className={styles.contact}>
      <Link to="/contact" >Contact Us</Link>
      
    </div>
    <div className={styles.copy}>
      &copy; {year} All Right Reserved
    </div>
    <div className={styles.link}>
    <a href="https://www.facebook.com" target='_blank'><FaFacebook color='rgb(244, 65, 235)'  />
      </a>
    <a href="https://www.x.com" target='_blank'><FaTwitter color='rgb(244, 65, 235)' /></a>
    <a href="https://www.linkedin.com" target='_blank'><FaLinkedinIn color='rgb(244, 65, 235)'  /></a>

    

    </div>
  </div>
  )
}

export default Footer
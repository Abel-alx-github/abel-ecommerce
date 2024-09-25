import styles from "./Contact.module.scss"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Contact = () => {
  const form = useRef();
  // console.log(process.env.REACT_APP_SERVIES)
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(process.env.REACT_APP_SERVIES,
                process.env.REACT_APP_TEMPLATE,
                form.current, {
                publicKey: process.env.REACT_APP_PUBLICK_KEY,
      })
      .then(
        () => {
          toast.success("Successfully sent!")
          // console.log('SUCCESS!');
        },
        (error) => {
          toast.error(error.message)
          // console.log('FAILED...', error.text);
        },
      );
      
      e.target.reset()
    };

  return (
    <div className={styles.container}>
        
        <form ref={form} onSubmit={sendEmail}
        >
        <h2>Contact Us</h2>
       
          
          <label>Name</label>
          <input  type="text" name="user_name"required /><br/>
          
          <label>Email</label>
          <input type="email" name="user_email" required/><br/>
          
          <label>Subject:</label>
          <input type="text" name="user_subject" required/><br/>
          
          <label>Message</label>
          <textarea name="message" required />
          
          <input className='--btn --btn-primary' style={{alignSelf:"flex-start"}} type="submit" value="Send" />
        </form>
        
  </div>
  );
};

export default Contact
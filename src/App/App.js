import { BrowserRouter as Routers, Route, Routes, Link} from 'react-router-dom'

// import pages from pages/index.js
import {Contact, Home, Login, Register, Reset} from '../pages/';
import AddProduct from '../pages/AddProduct/AddProduct';
// import components from componets/index.js
import {Header, Footer} from '../components/';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from '../components/Product/ProductDetails/ProductDetails';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
// import Contact from "../pages/Contact/Contact"



function App() {
  return (
      <>
    < ToastContainer />  

      <Routers> 
       <Header />       
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route path="/add-product/:id" element={<AddProduct />}/>

          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />}/>
          <Route path='/checkout' element={< Checkout />} />

          
          <Route path='/order-history' element={<div style={{marginTop:"100px"}}><h1>Soon this page will be live...</h1> <Link to="/" className="--btn --btn-primary" >Go to Home</Link></div>} />

          <Route path="*" element={<div style={{marginTop:"100px"}}><h1>Not Found</h1> <Link to="/" className="--btn --btn-primary" >Go to Home</Link></div> } />
        </Routes>

        <Footer />
      </Routers>     
      </>
    
  );
}

export default App;

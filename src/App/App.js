import { BrowserRouter as Routers, Route, Routes, Link} from 'react-router-dom'

import {Contact, Home, Login, Register, Reset} from '../pages/';
import AddProduct from '../pages/AddProduct/AddProduct';
// import components from componets/index.js
import {Header, Footer} from '../components/';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from '../components/Product/ProductDetails/ProductDetails';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Admin from '../pages/Admin/Admin';
// import Contact from "../pages/Contact/Contact"

import OrderHistory from '../pages/OrderHistory/OrderHistory'   
import CheckoutDetails from '../pages/Checkout/CheckoutDetail';
import CheckoutSuccess from '../pages/Checkout/CheckoutSuccess'; 
import OrderDetails from '../pages/OrderDetails/OrderDetails';
import ProductRating from '../components/ProductRating/ProductRating';
import AdminOnlyRoute from '../components/AdminOnlyRoute/AdminOnlyRoute';


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

          {/* <Route path="/add-product/:id" element={<AddProduct />}/> */}

          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />}/>
          <Route path='/checkout' element={< Checkout />} />

          
          <Route path='/order-history' element={< OrderHistory />} />
          <Route path='/order-details/:id' element={< OrderDetails/>} />
          <Route path='/review-product/:id' element={< ProductRating />} />
          
          
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path='/checkout' element={<Checkout />} />
          <Route path="checkout-detail" element={ <CheckoutDetails />} />
          <Route path="/checkout-success" element={< CheckoutSuccess />} />

          <Route path="*" element={<div style={{marginTop:"100px"}}><h1>Not Found</h1> <Link to="/" className="--btn --btn-primary --btn-block" >Go to Home</Link></div> } />
        </Routes>

        <Footer />
      </Routers>     
      </>
    
  );
}

export default App;

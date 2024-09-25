import styles from './AddProduct.module.scss'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { selectProducts } from '../../redux/slice/productSlice';
import { useSelector } from 'react-redux';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebaseConfig/firebaseConfig';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';

import Loader from '../../components/Loader/Loader'
import Card from '../../components/Card/Card';

const detectForm = (id, fun1, fun2) => {
  if(id === "ADD") return fun1
  return fun2
}


const AddProduct = () => {

const categories = [
  {id: 1, name: "Women Fashion"},
  {id:2, name:"Men Fashion"},
  {id:3, name: "Electronics"},
  {id:4, name: "Beauty"},
  {id: 5, name : "Books"},
  {id:6, name: "Home & Kitchen"},
  {id : 7, name: "Movies & Tv"}
]

const initialState = {
  name: "",
  price: "",
  category: "",
  brand:"",
  desc: "",
  imageUrl: ""
};

const {id} = useParams()
// console.log(id,"===useparams(id=====")
const products = useSelector(selectProducts)
const editProduct = products.find(product => product.id === id)
// console.log(editProduct,"editProduct")


const [product, setProduct]= useState(initialState)
// const [product, setProduct] = useState(() => {
//   const newState = detectForm(id, {...initialState}, editProduct)
//   return newState
// })

const [uploadProgress, setUploadProgress] = useState(0)
const [isLoading, setIsLoading] = useState(false)
const navigate = useNavigate()


const handleInputChange = (e) => {
  const {name, value} = e.target;
  // console.log(product, "handleInputchange")
  setProduct({...product, [name]: value})
}

const handleImageChange = (e) => {
  e.preventDefault()

  const file = e.target.files[0];
  const storageRef = ref(storage, `product/${Date.now()}${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    },

    (error) => {
        toast.error(error.message)
    },

    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProduct({...product, imageUrl : downloadURL})
        // console.log(product, "product after image set----------")
        toast.success("Image uploaded successfully.")
      })
    }
  )
}


// ?add product function

const addProduct = (e) => {
  e.preventDefault()
  setIsLoading(true)

  

  try {
    const colRef = collection(db, "products")
    const docRef = addDoc(colRef, {
      name:product.name,
      price:Number(product.price),
      brand:product.brand,
      category:product.category,
      desc:product.desc,
      imageUrl:product.imageUrl,
      createdAt:Timestamp.now().toDate()
    })
    // console.log("product is added............")
    setIsLoading(false)
    setUploadProgress(0)
    setProduct({...initialState})

    toast.success("Product uploaded successfully.")
    e.target.reset()
    // navigate("/")
  }
  catch(error) {
      setIsLoading(false)
      toast.error(error.message)
  }
}

  const updateProduct = (e) => {
      e.preventDefault()
      setIsLoading(true)

      if(product.imageUrl !== editProduct.imageUrl) {
        const storageRef = ref(storage, editProduct.imageUrl)
        deleteObject(storageRef)
      }

      try {
         setDoc(doc(db, "products", id), {
          name:product.name,
          price:Number(product.price),
          brand:product.brand,
          category:product.category,
          desc:product.desc,
          imageUrl:product.imageUrl,
          createdAt: editProduct.createdAt,
          editeAt: Timestamp.now().toDate
         })
        
         setIsLoading(false)
         toast.info("Edited successfully")
        //  navigate("/")
      }
      catch(error) {
        setIsLoading(false)
        toast.error(error.message)
      }
    }






  return (
    <>
      {isLoading && <Loader />}
     
      <div className={styles.product}>
      <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card} >

        <form onSubmit={detectForm(id, addProduct, updateProduct)}>
          <label htmlFor="">Product name:</label>
          <input type="text"
                 placeholder='Add product name...'
                 required
                 name="name"
                 value={product.name}
                 onChange={(e) => handleInputChange(e)} 
          />
          <label>Product image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                 <div className={styles.progress}>
                    <div className={styles["progress-bar"]} style={{width: `${uploadProgress}`}}>
                      { uploadProgress < 100 ? `Uploading ${uploadProgress}` : `Upload complete ${uploadProgress}%`}
                    </div>
                 </div>
              )}

              <input type="file"
              accept="image/*"
              placeholder="insert image..."
              name="image"
              onChange={(e) => handleImageChange(e)}
              required
              />
              {product.imageUrl === "" ? null : (
                <input 
                  type='text'
                  placeholder='Image url'
                  name="imageUrl"
                  value={product.imageUrl}
                  disabled

                />
              )}
            </Card>

            <label htmlFor="">Product Price</label>
            <input type="number"
                  placeholder='Product price...'
                  required
                  name="price"
                  value={product.price}
                  onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="">Product Category:</label>
            <select name="category" value={product.value} onChange={(e) => handleInputChange(e)} required >
              <option value="" disabled>-- Choose The Product Category --</option>
              {
                categories.map(category => (
                  <option value={category.name} key={category.id}>{category.name}</option>
                ))
              }
            </select>

            <label>Product Brand:</label>
            <input 
              type='text'
              placeholder="Product Brand..."
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
              required
            />  

            <label htmlFor="">Product Description</label>
            <textarea name="desc" id="" cols={25} rows={10} required onChange={(e) => handleInputChange(e)}></textarea>
        
            <button  className={"--btn --btn-primary"} style={{marginBottom:"80px"}}>
              {detectForm(id, "Add Product", "Edit Product")}
              </button>
        
        </form>
        </ Card>
       </div>
    
    </>
  )
}

export default AddProduct 
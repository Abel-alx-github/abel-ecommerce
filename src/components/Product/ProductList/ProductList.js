import styles from './ProductList.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { FILTER_BY_SEARCH, selectFilteredProducts, SORT_PRODUCTS } from "../../../redux/slice/filterSlice"
import { useEffect, useState } from "react"
import { FaListAlt } from 'react-icons/fa'
import { BsFillGridFill } from 'react-icons/bs'
import ProductItem from '../ProductItem/ProductItem'
import SearchBar from '../../SearchBar/SearchBar'
import Pagination from '../../Pagination/Pagination'



const ProductList = ({products}) => {
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("latest")
  const filteredProducts = useSelector(selectFilteredProducts)

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(9)


  const indexOfLastProduct = productsPerPage * currentPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(SORT_PRODUCTS({products, sort}))
  }, [products, sort, dispatch])

  
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, search}) )
  }, [products, search, dispatch])
// console.log(products, '==========products in List=======')
  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill 
            size={20}
            color="rgb(244, 65, 235)"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="rgb(244, 65, 235)" onClick={ () => setGrid(false)} />
          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
    <div>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>

    <div className={styles.sort}>
      <label>Sort by:</label>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="latest">Latest</option>
        <option value="lowest-price" >Lowest Price</option>
        <option value="highest-price">Highest Price</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
    </div>
  </div>

    <div className={grid ? `${styles.grid}` : `${styles.list}`}>
      {
        products.length === 0 ?
           (<p>No product found.</p>) 
        :
         ( <>
          {
            currentProducts.map(product => {
              return(
                <div key={product.id}>
                  <ProductItem {...product} grid={grid}  />
                </div>
              )
            })
          }
         </>
        )
      }

   

    </div>
    <div>
        <Pagination currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  productsPerPage={productsPerPage}
                 totalProducts={filteredProducts.length}                                             
        />
     </div>
    </div>
  )
}

export default ProductList
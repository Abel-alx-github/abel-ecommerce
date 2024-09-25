
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALC_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
import Card from "../../Card/Card";
import styles from "./ProductItem.module.scss";

const ProductItem = (product, grid ) => {


  const dispatch = useDispatch();

  const shortDescription = (description, num) => {
    if (description.length > num) {
      return description.substring(0, num) + "...";
    }
    return description;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALC_TOTAL_QUANTITY());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${product.id}`}>
        <div className={styles.img}>
          <img src={product.imageUrl} alt={product.name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${product.price}`}</p>
          <h4>{shortDescription(product.name, 15)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortDescription(product.desc, 150)}</p>}

        <button
          className="--btn --btn-danger"
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null,
};

const productSlice = createSlice({
name: "product",
initialState,

reducers : {
    STORE_PRODUCTS(state, action) {
        state.products = action.payload.products
    },
    GET_PRICE_RANGE: (state, action) => {
        const {products} = action.payload;
        const listOfPrice = [];

        products.map(item => {
            const price = item.price;
            return listOfPrice.push(price)
        })

        const max = Math.max(...listOfPrice)
        const min = Math.min(...listOfPrice)

        state.maxPrice = max;
        state.minPrice = min;
    }
}
})

// console.log(initialState.maxPrice, "max=====")
// console.log(initialState.minPrice, "min=======")


export const selectProducts = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;


export const {STORE_PRODUCTS, GET_PRICE_RANGE} = productSlice.actions;
export default productSlice.reducer;
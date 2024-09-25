import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredProducts: [],
}
const filterSlice = createSlice({
    name: "filter",
    initialState,

    reducers: {
        FILTER_BY_SEARCH : (state, action) => {
            const {products, search} = action.payload
            const tempFiltered = products.filter(item => (
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.category.toLowerCase().includes(search.toLowerCase())  
            ))
            state.filteredProducts = tempFiltered
        },

        SORT_PRODUCTS: (state, action) => {
            const {products, sort} = action.payload;
            let tempFiltered = [];
            if(sort === "latest") tempFiltered = products;

            if (sort === 'lowest-price') {
                tempFiltered = products.slice().sort((a, b) => {
                    return (a.price - b.price)
                });
            }

            if (sort === 'highest-price') {
                tempFiltered = products.slice().sort((a, b) => {
                    return (b.price - a.price)
                } )
            }

            if(sort === 'a-z') {
                tempFiltered = products.slice().sort((a, b) => {
                    return (a.name.localeCompare(b.name))
                })
            }

            if (sort === 'z-a') {
                tempFiltered = products.slice().sort((a, b) => {
                    return (b.name.localeCompare(a.name))
                })
            }

            state.filteredProducts = tempFiltered;
        },

        FILTER_BY_CATEGORY : (state, action) => {
            const {products , category} = action.payload
            let tempFiltered = []                
            
            if (category === "All") {
                tempFiltered = products
             } else {
                tempFiltered = products.filter((item) => { 
                    return category === item.category
                })
             }

            state.filteredProducts = tempFiltered;
        },

        FILTER_BY_BRAND : (state, action) => {
            const {products , brand} = action.payload;

            let tempFiltered = [];
            if (brand === "All") tempFiltered = products
            else {
                tempFiltered = products.filter((item) => item.brand === brand)
            }

            state.filteredProducts = tempFiltered;
        },

        FILTER_BY_PRICE : (state, action) => {
            const {products, price} = action.payload
            let tempFiltered = [];
            
            tempFiltered = products.filter(item => item.price <= price)
            
            state.filteredProducts = tempFiltered
        }

    }
 })

export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export const {FILTER_BY_BRAND,
             FILTER_BY_CATEGORY,
             FILTER_BY_PRICE,
             FILTER_BY_SEARCH,
             SORT_PRODUCTS
} = filterSlice.actions;
 export default filterSlice.reducer;
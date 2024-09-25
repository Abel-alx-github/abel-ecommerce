import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";




const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    prevUrl: '',
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        ADD_TO_CART: (state, action) => {
            const productIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
            
            if(productIndex >= 0) {
                state.cartItems[productIndex].cartQuantity += 1;
                toast.info(`${action.payload.name} is increased by one.`)  
            } else {
                const newProduct = {...action.payload, cartQuantity: 1}
                state.cartItems.push(newProduct);
                toast.info(`${action.payload.name} is added to cart.`)
            }
            // console.log(state.cartItems, '====cartItem===')
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    
        },

        DECREASE_FROM_CART : (state, action) => {
            const productIndex = state.cartItems.findIndex(item => action.payload.id === item.id)
            // console.log(productIndex, '--------by one==')
            if (state.cartItems[productIndex].cartQuantity > 1) {
                // console.log("decrease----from if bloc--")
                state.cartItems[productIndex].cartQuantity -= 1;
                toast.info(`${action.payload.name} is decreaded by one.`)
            }
            else if (state.cartItems[productIndex].cartQuantity === 1) {
                // console.log("decrease----from else--if bloc--")
              
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
                toast.info(`${action.payload.name} is removed from cart.`)
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        REMOVE_FROM_CART : (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)

            toast.info(`${action.payload.name} is removed from cart`)

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        CLEAR_CART_ITEM : (state, action) => {
            state.cartItems = []

            // toast.info(`Cart is empty.`)

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        CALC_TOTAL_QUANTITY : (state, action) => {
            const listOfQuty = [];
            
            state.cartItems.map(item => {
                return listOfQuty.push(item.cartQuantity)
            })

            const totalQuty = listOfQuty.reduce( (a,b) => a+b ,0)

            state.cartTotalQuantity = totalQuty;
        },

        CALC_SUBTOTAL : (state, action) => {
            const listOfPrice = [];

            state.cartItems.map(item => {
                return listOfPrice.push(item.price * item.cartQuantity )
            });

            const totalPrice = listOfPrice.reduce( (price1, price2) => {
                return(price1 + price2)
            }, 0)

            state.cartTotalAmount = totalPrice;
        },

        SAVE_LINK : (state, action) => {
            state.prevUrl = action.payload;
        },
    }
});


export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = state => state.cart.cartTotalAmount;
export const selectTotalQuantity = state => state.cart.cartTotalQuantity;
export const selectPrevUrl = state => state.cart.prevUrl;

export const {
        ADD_TO_CART,
        REMOVE_FROM_CART,
        DECREASE_FROM_CART,
        CLEAR_CART_ITEM,
        CALC_SUBTOTAL,
        CALC_TOTAL_QUANTITY,
        SAVE_LINK
    } = cartSlice.actions;

export default cartSlice.reducer;
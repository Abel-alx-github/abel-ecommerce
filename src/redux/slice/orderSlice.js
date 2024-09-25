import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderHistory: [],
    totalOrderAmount: 0,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,

    reducers: {
        ADD_ORDERS: (state, action) => {
            state.orderHistory = action.payload
        },

        CALC_TOTAL_ORDER_AMOUNT: (state) => {
            const amount = [];
            state.orderHistory.forEach(order => {
                return amount.push(order.orderAmount)
            })
            state.totalOrderAmount = amount.reduce((acc, money) => acc + money, 0)
        }
    },
});


export const selectOrderHistory = state => state.order.orderHistory;
export const selectTotalOrderAmount = state => state.order.totalOrderAmount;

export const { ADD_ORDERS, CALC_TOTAL_ORDER_AMOUNT } = orderSlice.actions;
export default orderSlice.reducer;
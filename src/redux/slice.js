import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    // value: 0 // Used for product increment only of single item
    items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): []
}

const addToCart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Used for product increment only of single item
        // addItem: (state) => {
        //     state.value+=1;
        // },

        // Used for complete info of Prod
        addItem: (state, action) => {
            // console.log("cart product item details", action.payload);
            state.items.push(action.payload);
            // maintain into local storage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        // remove single item from cart
        // removeItem: (state) => {
        //     state.value > 0 ? state.value-=1 : null;
        // },
        // remove multiple product item
        removeItem: (state, action) => {
            const cartData = state.items.filter(item => item.id != action.payload.id);
            state.items = cartData;
            localStorage.setItem('cart', JSON.stringify(cartData));
        },
        clearAllItem: (state, action) => {
            // Used for product cart empty count
            // state.value = 0;
            // used for multiple product cart empty
            console.log("clear cart...");
            
            state.items=[];
            localStorage.removeItem('cart','');
        }
    }
})

export const {addItem, removeItem, clearAllItem } = addToCart.actions;
export default addToCart.reducer;
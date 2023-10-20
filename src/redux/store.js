import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './reducers/cart';
import { eventReducer } from './reducers/event';
import { productReducer } from './reducers/product';
import { sellerReducer } from './reducers/seller';
import { userReducer } from './reducers/user';

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
  },
});

export default Store;

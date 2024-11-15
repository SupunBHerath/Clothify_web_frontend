import { createStore } from 'redux';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    default:
      return state;
  }
};

const ShopingCartStore = createStore(cartReducer);

export default ShopingCartStore;

import { createStore } from "redux";

const initialState = {
  cart: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id && item.selectedSize.name === action.payload.selectedSize.name
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].qty += action.payload.qty; 
        return { ...state, cart: updatedCart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            qty: action.payload.qty,
          },
        ],
      };

    case "UPDATE_QTY":
      const updatedQtyCart = [...state.cart];
      updatedQtyCart[action.payload.index].qty = action.payload.qty;
      return { ...state, cart: updatedQtyCart };

      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter(
            (item) =>
              !(item.id === action.payload.id && item.selectedSize.name === action.payload.size)
          ),
        };
      

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};


const ShopingCartStore = createStore(cartReducer);

export default ShopingCartStore;

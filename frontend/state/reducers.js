//import the action types from the file where you defined them 'actions.js'
import {
    GET_ORDERS_START,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
    ADD_ORDER,
    ADD_ORDER_START,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAILURE,
  } from './actions'


//In this reducer, GET_ORDERS_START sets isLoading to true and resets any previous errors. 
// GET_ORDERS_SUCCESS sets isLoading to false, updates orders with the payload from the action 
// (which is fetched data), and resets any errors. GET_ORDERS_FAILURE sets isLoading
//  to false and updates error with the payload from the action (which should be the error message).

const initialState = {
    orders: [],
    isLoading: false,
    error: null
  }
  
  export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDERS_START:
        return { ...state, isLoading: true, error: null }
      case GET_ORDERS_SUCCESS:
        return { ...state, isLoading: false, orders: action.payload, error: null }
      case GET_ORDERS_FAILURE:
        return { ...state, isLoading: false, error: action.payload }
          case ADD_ORDER_START:
              return { ...state, isLoading: true, error: null }
          case ADD_ORDER_SUCCESS:
              return { ...state, isLoading: false, orders: [...state.orders, action.payload], error: null }
          case ADD_ORDER_FAILURE:
              return { ...state, isLoading: false, error: action.payload }
      default:
        return state
    }
  }

//   ADD_ORDER creates a new state where orders is a new array that 
//   includes all the previous orders plus the new order (which is action.payload).
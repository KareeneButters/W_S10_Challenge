import axios from 'axios'

// define actions that represent the different states of asynchronous operation: 
// one for the start of the request, one for a successful result, and one for a failure.

export const GET_ORDERS_START = 'GET_ORDERS_START'
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS'
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE'
export const ADD_ORDER = 'ADD_ORDER'
export const ADD_ORDER_START = 'ADD_ORDER_START'
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS'
export const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE'

// create an action creator function that uses Redux Thunk to perform the async operation.

// function dispatches a GET_ORDERS_START action, makes a GET request to the endpoint, 
// then dispatches either a GET_ORDERS_SUCCESS action with the response data or a 
// GET_ORDERS_FAILURE action with the error, depending on the outcome of the request.

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch({ type: GET_ORDERS_START })

    axios
      .get('http://localhost:9009/api/pizza/history')
      .then((response) => {
        dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data })
      })
      .catch((error) => {

        const errorMessage = error.response ? error.response.data.message : error.message

        dispatch({ type: GET_ORDERS_FAILURE, payload: errorMessage })
      })
  }
}

// function returns a Redux Thunk action (a function) instead of a plain action 
// (an object). This function makes a POST request to the server to add 
// a new order, and then dispatches an ADD_ORDER action with the response data.

export const addOrder = (order) => {
    return (dispatch) => {
      dispatch({type: ADD_ORDER_START })

      axios
        .post('http://localhost:9009/api/pizza/order', order) 
        .then((response) => {
          console.log(response)
          dispatch({ type: ADD_ORDER_SUCCESS, payload: response.data.data })
          // dispatch({ type: ADD_ORDER, payload: response.data.data })
        })
        .catch((error) => {

          const errorMessage = error.response ? error.response.data.message : error.message

          // handle the error
          dispatch({ type: ADD_ORDER_FAILURE, payload: errorMessage })
        })
        
    }
  }
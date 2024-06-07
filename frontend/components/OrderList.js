// Used useEffect to dispatch the fetchOrders
//  action when the component mounts.
import React, {useEffect} from 'react'
// Imported connect from react-redux and fetchOrders 
// from actions file.
import { connect } from 'react-redux' 
import { fetchOrders } from '../state/actions'

// Replaced the hardcoded orders array with the orders prop
function OrderList({ orders, fetchOrders }) {
  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  // const orders = []
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map((order, index) => {
            return (
              <li key={index}>
                <div>
                {order.customer} ordered a size {order.size} with {order.toppings} toppings
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}

// mapStateToProps is used to map the
//  orders state from the Redux store 
//  to the orders prop of the OrderList
//   component
const mapStateToProps = (state) => {
  return { orders: state.orders.orders }
}

// mapDispatchToProps is used to map the fetchOrders 
// action creator to a prop of the same name
const mapDispatchToProps = { fetchOrders }

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
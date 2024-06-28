import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addOrder } from '../state/actions'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}



function PizzaForm({ addOrder, isLoading, error }) {

  const [form, setForm] = useState(initialFormState)
  const [validationErrors, setValidationErrors] = useState({})

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({
      ...form,
      [e.target.name]: value
    })
  }

  const validateForm = () => {
    const errors = {}
    if (!form.fullName) errors.fullName = "fullName is required"
    if (!form.size) errors.size = "size must be one of the following values"
    return errors
  }

// addOrder in handleSubmit function 
// to dispatch an action that adds the new order 
// to the state
const handleSubmit = (e) => {
  e.preventDefault()
  
  const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

setForm({...form, isOrderPending: true})

  const newForm = {...form} 
  const valueTosubmbit = {
    fullName: form.fullName,
    size: form.size,
    toppings: [],
  }
  for (let key in newForm ) {
    if (newForm[key] === true) {
      valueTosubmbit.toppings.push(key)
    } 
  }
  // Dispatch an action to add the new order to the state
  addOrder(valueTosubmbit)
  // Reset the form
  setForm(initialFormState)
  setValidationErrors({})
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>Order failed: {error}</div>}


      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={form.fullName}
            onChange={handleInputChange}
          />
          {validationErrors.fullName && <div className='error'>{validationErrors.fullName}</div>}
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={form.size}
            onChange={handleInputChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
          {validationErrors.size && <div className='error'>{validationErrors.size}</div>}
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={form['1']} onChange={handleInputChange} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={form['2']} onChange={handleInputChange} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox"  checked={form['3']} onChange={handleInputChange} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={form['4']} onChange={handleInputChange} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox"  checked={form['5']} onChange={handleInputChange} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
const mapDispatchToProps = { addOrder }

const mapStateToProps = state => ({
  isLoading: state.orders.isLoading,
  error: state.orders.error,
})

export default connect(mapStateToProps, mapDispatchToProps, null)(PizzaForm)
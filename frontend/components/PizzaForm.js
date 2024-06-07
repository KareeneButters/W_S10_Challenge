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



function PizzaForm({ addOrder }) {

  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({
      ...form,
      [e.target.name]: value
    })
  }

// addOrder in handleSubmit function 
// to dispatch an action that adds the new order 
// to the state
const handleSubmit = (e) => {
  e.preventDefault()
  // Dispatch an action to add the new order to the state
  addOrder(form)
  // Reset the form
  setForm(initialFormState)
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {true && <div className='pending'>Order in progress...</div>}
      {true && <div className='failure'>Order failed: fullName is required</div>}

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

export default connect(null, mapDispatchToProps)(PizzaForm)
import React, { Component } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'
// import NumberFormat from 'react-number-format'
class Add extends Component {
  initialState = {
    form: {
      name: '',
      productname: '',
      price: '',
      quantity: 1,
    },
  }

  state = this.initialState

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      form: { ...this.state.form, [name]: value },
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { name, productname, price, quantity } = this.state.form
    const { addRow } = this.props

    const newProduct = {
      name,
      productname,
      price,
      quantity,
    }

    addRow(newProduct)
    this.setState(this.initialState)
  }

  render() {
    const { name, productname, price, quantity } = this.state.form

    return (
      <Modal trigger={<Button content="Add New Product" />} closeIcon>
        <Modal.Header>Add New Product</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="Name"
                name="name"
                value={name}
                onChange={this.handleChange}
                autoFocus={true}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Product Description"
                name="productname"
                value={productname}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Price"
                name="price"
                type="text"
                min={1}
                max={99999}
                step={0.1}
                // pattern="[+-]?\d+(?:[.,]\d+)?"
                placeholder="Enter amount"
                // prefix="$"
                // error="Value must be an number"
                // decimalSeparator="."
                value={price}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (!/^\d*\.?\d*$/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
              />
              {/* <NumberFormat
                value={price}
                displayType={'text'}
                label="Price"
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
                fixedDecimalScale={true}
                onChange={this.handleChange}
              /> */}
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Quantity"
                name="quantity"
                type="number"
                value={quantity}
                min={1}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button
              type="submit"
              content="Submit"
              disabled={!name || !productname || !price || !quantity}
            />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Add

import React, { Component } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'

class Edit extends Component {
  initialState = {
    form: {
      name: '',
      productname: '',
      price: '',
      quantity: 1,
    },
  }

  state = this.initialState

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      const product = this.props.getProductById(this.props.id)

      this.setState({
        form: {
          name: product.name,
          productname: product.productname,
          price: product.price,
          quantity: product.quantity,
        },
      })
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      form: { ...this.state.form, [name]: value },
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { name, productname, price, quantity } = this.state.form
    const { updateRow } = this.props

    const updatedProduct = {
      name,
      productname,
      price,
      quantity,
    }

    updateRow(this.props.id, updatedProduct)
    this.props.onClose()
  }

  render() {
    const { name, productname, price, quantity } = this.state.form
    const { isOpen, onClose } = this.props

    return (
      <Modal open={isOpen} onClose={onClose} closeIcon>
        <Modal.Header>Edit Product</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input label="Name" name="name" value={name} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Productname"
                name="productname"
                value={productname}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input label="Price" name="price" value={price} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Quantity"
                name="quantity"
                value={quantity}
                min={1}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit" content="Submit" />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Edit

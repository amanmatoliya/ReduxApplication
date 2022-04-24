import React, { Component } from 'react'
// import ReactDOM from "react-dom";
import { Link } from 'react-router-dom'
import { Input, Container, Button } from 'semantic-ui-react'
import Add from './Add'
import View from './View'

export default class App extends Component {
  initialState = {
    products: [
      { name: 'Virat', productname: 'Kohli', price: '4.00', quantity: 11 },
      { name: 'Sachin', productname: 'God', price: '7.50', quantity: 16 },
      { name: 'MSD', productname: 'Dhoni', price: '25.00', quantity: 11 },
    ],
    results: [],
    query: '',
  }

  state = this.initialState

  componentDidUpdate(prevProps, prevState) {
    if (prevState.products !== this.state.products) {
      this.resetSearch()
    }
  }

  search = (event) => {
    const { products } = this.state
    const { value } = event.target

    this.setState({ query: value })

    const results = products.filter((product) => {
      const regex = new RegExp(value, 'gi')
      return product.name.match(regex)
    })

    this.setState({ results })
  }

  resetSearch = () => {
    const { products, query } = this.state

    const results = products.filter((product) => {
      const regex = new RegExp(query, 'gi')
      return product.name.match(regex)
    })

    this.setState({ results })
  }

  getProductById = (id) => {
    const { products } = this.state

    const u = products.filter((product) => product.name === id)

    return u[0]
  }

  addRow = (product) => {
    const { products } = this.state

    this.setState({ products: [...products, product] })
  }

  updateRow = (id, updatedProduct) => {
    const { products } = this.state

    this.setState({
      products: products.map((product) => (product.name === id ? updatedProduct : product)),
    })
  }

  deleteRow = (id) => {
    const { products } = this.state

    this.setState({
      products: products.filter((product) => product.name !== id),
    })
  }

  render() {
    const { products, results, query } = this.state
    const data = results.length === 0 && !query ? products : results

    return (
      <Container>
        <div class="ui hidden divider"></div>
        <Add addRow={this.addRow} />

        <Input icon="search" onChange={this.search} placeholder="Search" />

        <Link to="/logout">
          <Button negative floated="right">
            LOGOUT
          </Button>
        </Link>
        <div class="ui hidden divider"></div>
        <View
          data={data}
          deleteRow={this.deleteRow}
          updateRow={this.updateRow}
          getProductById={this.getProductById}
        />
      </Container>
    )
  }
}

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Grid } from 'semantic-ui-react'

import { userLogin } from '../redux'

const Login = ({ history }) => {
  const [role, setRole] = useState('admin')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const doLogin = (e) => {
    e.preventDefault()
    console.log('Logging in...', [role, password])
    if (role === 'admin' && password === 'admin') {
      dispatch(
        userLogin({
          role,
          password,
        })
      ).then(() => {
        history.push('/main')
      })
    } else {
      console.log('Wrong Password')
    }
  }

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Form onSubmit={doLogin} success>
          <br></br>
          <Form.Field>
            <label>User Name:</label>
            <Input
              name="role"
              type="text"
              value="admin"
              onChange={(e) => setRole(e.target.value)}
            />
          </Form.Field>
          <br />
          <Form.Field>
            <label>Password</label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              // value="admin"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <br />
          <Button positive>Login</Button>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(Login)

import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const initialState = {
  user: readUserFromLocalStorage(),
}

// Reducer
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'USER_LOGIN':
      return {
        user: payload,
      }
    case 'USER_LOGOUT':
      return {
        user: null,
      }
    default:
      return state
  }
}

// Store
export const store = createStore(reducer, initialState, applyMiddleware(thunk, logger))

// Actions
export const userLogin = () => (dispatch) => {
  return timeoutPromise(1000)
    .then(() =>
      dispatch({
        type: 'USER_LOGIN',
        payload: {
          role: 'admin',
          // token: "token7j34e8ffdjg348",
          token: 'Aman BidOnHomes Project',
        },
      })
    )
    .then((data) => {
      console.log('THEN: ', data)
      localStorage.setItem('user', JSON.stringify(data))
    })
}

export const userLogout = () => (dispatch) => {
  localStorage.clear()
  return dispatch({
    type: 'USER_LOGOUT',
  })
}

// Helpers
const timeoutPromise = (ms) => {
  let ctr, rej
  const promise = new Promise(function (resolve, reject) {
    ctr = setTimeout(resolve, ms)
    rej = reject
  })
  promise.cancel = () => {
    clearTimeout(ctr)
    rej(Error('Cancelled'))
  }
  return promise
}

// Read user from the localStorage
function readUserFromLocalStorage() {
  try {
    const serialized = localStorage.getItem('user')
    if (serialized === null) {
      return undefined
    }
    return JSON.parse(serialized)
  } catch (err) {
    return undefined
  }
}
export default function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload],
      }

    case 'EDIT_EMPLOYEE':
      const updatedEmployee = action.payload

      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee
        }
        return employee
      })

      return {
        ...state,
        employees: updatedEmployees,
      }

    case 'REMOVE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter((employee) => employee.id !== action.payload),
      }

    default:
      return state
  }
}

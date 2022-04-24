import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { userLogout } from '../redux'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userLogout())
  }, [dispatch])

  return <div>Logging out...</div>
}

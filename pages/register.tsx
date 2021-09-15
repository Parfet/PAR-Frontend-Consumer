import React from 'react'
import styled from 'styled-components'

import Navigator from '../core/components/Navigator'
import Register from '../features/Register/pages';


const SignInPages = () => {

  return (
    <Navigator yellow middleText='Register'>
      <Register />
    </Navigator>
  )
}

export default SignInPages
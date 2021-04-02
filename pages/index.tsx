import React from 'react'
import styled from 'styled-components'
import FilterListIcon from '@material-ui/icons/FilterList';

import HomePage from './Navigator/Navigator'
import PartyList from '../features/Party/pages/party-list'

const Screen = styled.div`
  overflow-x: hidden;
`
const Home = () => {
  return (
    <Screen>
      <HomePage
        backTextButton= 'Restaurant'
        middleText= 'Party'
        leftIcon= {<FilterListIcon /> }
      >
        <PartyList />
      </HomePage>
    </Screen>
  )
}

export default Home

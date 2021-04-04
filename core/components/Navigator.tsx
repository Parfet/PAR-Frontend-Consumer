import React, { Component } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { Title, SubHeader } from '../config/textStyle'

const useStyles = makeStyles({
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    paddingTop: '0.25rem',
    paddingBottom: '0.5rem',
    backgroundColor: 'white',
    color: 'black',
  },
})

const TopAppBar = styled(AppBar)`
  top: 0;
  bottom: 'auto';
  background-color: ${props => props.isYellow ? '#F8CE28' : 'white'};
  color: ${props => props.isYellow ? 'white' : 'black'};
`

const CusNavigateBeforeIcon = styled(NavigateBeforeIcon)`
  color: ${props => props.isYellow ? 'white' : '#F8CE28'};
  font-size:36px;
`

const CusButton = styled(Button)`
  color: ${props => props.isYellow ? 'white' : 'black'};
  text-transform: capitalize;
`

interface Props {
  backTextButton: string,
  backRoute: string,
  middleText: string,
  leftIcon?: JSX.Element,
  children: JSX.Element,
  bottomNavigator?: JSX.Element,
  isYellow?: boolean
}

const Navigator = (props: Props) => {
  const { children, bottomNavigator, backTextButton, backRoute, middleText, leftIcon, isYellow } = props
  const router = useRouter()
  const classes = useStyles();

  return (
    <>
      <TopAppBar isYellow={isYellow}>
        <Toolbar style={{ padding: 0 }}>
          <div className="flex w-1/3">
            <CusButton onClick={() => router.push(backRoute)} isYellow={isYellow}>
              <CusNavigateBeforeIcon isYellow={isYellow}/>
              <SubHeader>{backTextButton}</SubHeader>
            </CusButton>
          </div>
          <div className="flex w-1/3 justify-center">
            <Title>
              {middleText}
            </Title>
          </div>
          <div className="flex w-1/3 justify-end">
            <Button>
              {leftIcon}
            </Button>
          </div>
        </Toolbar>
      </TopAppBar>

      <div className="mt-12">
        {children}
      </div>
      {
        bottomNavigator ?
          <AppBar color="primary" className={classes.bottomAppBar}>
            <Toolbar>
              {bottomNavigator}
            </Toolbar>
          </AppBar>
        :<></>
      }
    </>
  )
}

export default Navigator

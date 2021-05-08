import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import {
  makeStyles,
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
    position: 'fixed',
    zIndex: 1400,
  },
  floatingButton: {
    top: 'auto',
    bottom: 0,
    marginRight:'1.5em',
    marginBottom: '10%',
    backgroundColor: 'transparent',
    width:'auto',
    color: 'black',
    boxShadow: 'none',
    position: 'fixed',
    zIndex: 1400,
  },
})

const TopAppBar = styled(AppBar)`
  top: 0;
  bottom: 'auto';
  position: fixed;
  z-index:  1400;
  background-color: ${(props) => props.yellow ? '#F8CE28' : 'white'};
  color: ${(props) => props.yellow ? 'white' : 'black'};
`

const CusNavigateBeforeIcon = styled(NavigateBeforeIcon)`
  color: ${(props) => props.yellow ? 'white' : '#F8CE28'};
  font-size:36px;
`

const CusButton = styled(Button)`
  color: ${(props) => props.yellow ? 'white' : 'black'} !important;
  text-transform: capitalize !important;
`

interface Props {
  backTextButton?: string,
  backRoute?: string,
  middleText: string,
  rightIcon?: JSX.Element,
  leftIcon?: JSX.Element,
  children: JSX.Element,
  bottomNavigator?: JSX.Element,
  floatingButton?: JSX.Element,
  yellow?: boolean
}

const Navigator = (props: Props) => {
  const { children, bottomNavigator, backTextButton, backRoute, middleText, leftIcon, rightIcon, yellow, floatingButton } = props
  const router = useRouter()
  const classes = useStyles();

  return (
    <>
      <TopAppBar yellow={yellow}>
        <Toolbar style={{ padding: 0 }}>
          <div className="flex w-1/3">
            {
              backTextButton && backRoute ?
                <CusButton onClick={() => router.push(backRoute)} yellow={yellow}>
                  <CusNavigateBeforeIcon yellow={yellow}/>
                  <SubHeader white={yellow}>{backTextButton}</SubHeader>
                </CusButton>
                : <>{rightIcon}</>
            }
          </div>
          <div className="flex w-1/3 justify-center">
            <Title white={yellow}>
              {middleText}
            </Title>
          </div>
          <div className="flex w-1/3 justify-end">
            {leftIcon}
          </div>
        </Toolbar>
      </TopAppBar>

      <div>
        {children}
      </div>
      {
        bottomNavigator ?
          <AppBar className={classes.bottomAppBar}>
            <Toolbar>
              {bottomNavigator}
            </Toolbar>
          </AppBar>
        :<></>
      }
      {
        floatingButton ?
          <AppBar className={classes.floatingButton}>
              {floatingButton}
          </AppBar>
        :<></>
      }
    </>
  )
}

export default Navigator

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
  },
})

const TopAppBar = styled(AppBar)<IsYellow>`
  top: 0;
  bottom: 'auto';
  background-color: ${(iy: IsYellow) => iy.yellow ? '#F8CE28' : 'white'};
  color: ${(iy: IsYellow) => iy.yellow ? 'white' : 'black'};
`

const CusNavigateBeforeIcon = styled(NavigateBeforeIcon)<IsYellow>`
  color: ${(iy: IsYellow) => iy.yellow ? 'white' : '#F8CE28'};
  font-size:36px;
`

const CusButton = styled(Button)<IsYellow>`
  color: ${(iy: IsYellow) => iy.yellow ? 'white' : 'black'} !important;
  text-transform: capitalize !important;
`

type IsYellow = {
  yellow?: boolean
}

interface Props {
  backTextButton: string,
  backRoute: string,
  middleText: string,
  leftIcon?: JSX.Element,
  children: JSX.Element,
  bottomNavigator?: JSX.Element,
  yellow?: boolean
}

const Navigator = (props: Props) => {
  const { children, bottomNavigator, backTextButton, backRoute, middleText, leftIcon, yellow } = props
  const router = useRouter()
  const classes = useStyles();

  return (
    <>
      <TopAppBar yellow={yellow}>
        <Toolbar style={{ padding: 0 }}>
          <div className="flex w-1/3">
            <CusButton onClick={() => router.push(backRoute)} yellow={yellow}>
              <CusNavigateBeforeIcon yellow={yellow}/>
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

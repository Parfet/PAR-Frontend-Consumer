import React, { Component } from 'react'
import styled from 'styled-components'
import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Button,
  Typography,
  BottomNavigationAction,
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import { Title, SubHeader } from '../../core/config/textStyle'

const useStyles = makeStyles(() =>
  createStyles({
    backButton: {
      textTransform: 'capitalize',
    },
    topAppBar: {
      top: 0,
      bottom: 'auto',
    },
    bottomAppBar: {
      top: 'auto',
      bottom: 0,
    },
    appBarStyle: {
      backgroundColor: 'white',
      color: 'black',
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }),
);

interface Props {
  backTextButton: String,
  middleText: String,
  leftIcon: JSX.Element,
  children: JSX.Element,
}

const Navigator = (props: Props) => {
  const classes = useStyles();
  const { children, backTextButton, middleText, leftIcon } = props

  return (
    <>
      <AppBar className={`${classes.topAppBar} ${classes.appBarStyle}`}>
        <Toolbar style={{ padding: 0 }}>
          <div className="flex w-1/3">
            <Button className={classes.backButton}>
              <NavigateBeforeIcon style={{ color: '#FF9F0A' }} /> 
              <SubHeader>{backTextButton}</SubHeader>
            </Button>
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
      </AppBar>

      <div className="mt-12">
        {children}
      </div>

      <AppBar color="primary" className={`${classes.bottomAppBar} ${classes.appBarStyle}`}>
        <Toolbar>
          <div className="flex w-1/3 justify-center">
            <BottomNavigationAction label="ขอเข้าร่วม" icon={<ListIcon />} showLabel />
          </div>
          <div className="flex w-1/3 justify-center">
            <BottomNavigationAction label="สร้างปาร์ตี้ใหม่" icon={<AddIcon />} showLabel />
          </div>
          <div className="flex w-1/3 justify-center">
            <BottomNavigationAction label="ข้อความ" icon={<QuestionAnswerIcon />} showLabel />
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navigator

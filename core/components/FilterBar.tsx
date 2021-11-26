import React, { useState, useEffect } from 'react'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from '@material-ui/styles';

interface Props {
  children: JSX.Element
  open: boolean
  handleCloseFromParent?: () => void
  callBackToParent: (value) => void
}

const useStyles = makeStyles({
  paper: {
    marginTop: "3em",
    paddingTop: "3em",
    paddingLeft: "1em",
    width: "200px",
    background: "#FFFFFF"
  }
})

const FilterBar = (props: Props) => {
  const { children, open, handleCloseFromParent, callBackToParent } = props
  const classes = useStyles()
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    setOpenDrawer(open)
  }, [open])

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    callBackToParent(false);
    setOpenDrawer(open);
    
    if (handleCloseFromParent && !open) {
      handleCloseFromParent()
    }
  };


  return (
    <Drawer
      anchor="left" 
      open={openDrawer} 
      onClose={toggleDrawer(false)}
      classes={{paper: classes.paper}}
      >
      {children}
    </Drawer>
  )
}

export default FilterBar

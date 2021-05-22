import React, { useState, useEffect } from 'react'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from '@material-ui/styles';

interface Props {
  children :JSX.Element
  open :boolean
  callBackToParent :(value) => void
}

const useStyles = makeStyles({
  paper: {
    marginTop: "4em",
    paddingTop: "3em",
    width: "250px",
    background: "#FFDC97"
  }
})

const FilterBar = (props: Props) => {
  const { children, open, callBackToParent } = props
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
  };

  return (
    <Drawer
      anchor="right" 
      open={openDrawer} 
      onClose={toggleDrawer(false)}
      classes={{paper: classes.paper}}
      >
      {children}
    </Drawer>
  )
}

export default FilterBar

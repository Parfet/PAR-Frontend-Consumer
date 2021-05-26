import React, { useState } from 'react'
import styled from 'styled-components'
import { 
  IconButton, 
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener
  } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { RegularText } from '../config/textStyle'

interface menuItems {
  text :string 
  menuFunc : () => void 
}

interface Props {
  menuItems: Array<menuItems>
  menuColors: Array<string>
  textWhite?: boolean 
}

const NewMeatBall = styled(MoreHorizIcon)`
  color: #ffffff ;
`

const Meatball = (props: Props) => {
  const { menuItems, menuColors, textWhite } = props
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        > 
          <NewMeatBall /> 
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" className="p-0" onKeyDown={handleListKeyDown}>
                  {
                    menuItems.map( (data, index) => (
                      <MenuItem 
                        key={index} 
                        onClick={data.menuFunc} 
                        className={`
                          flex justify-center
                          ${ index % 2 === 0 ? menuColors[0] : menuColors[1]}
                          ${ textWhite ? 'text-white': 'text-black'}
                          `}
                        style={{ width: '128px'}}
                        >
                        <RegularText>{data.text}</RegularText>
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default Meatball

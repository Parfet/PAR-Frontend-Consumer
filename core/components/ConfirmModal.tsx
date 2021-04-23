import React, { useEffect, useState} from 'react'
import {
  Button,
  Dialog
  } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';

interface Props {
  showModal :boolean
  callBackToParent :(open, value) => void
}

const AcceptButton = withStyles(() => ({
  root: {
    backgroundColor: "#34C759",
    color: 'white',
    '&:hover': {
      backgroundColor: "#34C759",
      color: 'white',
    },
  },
}))(Button);

const ConfirmModal = (props: Props) => {
  const { callBackToParent, showModal } = props
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(showModal)
  })
  
  const handleClose = () => {
    setOpen(false);
    callBackToParent(false, false);
  };

  const handleAccept = () => {
    setOpen(false);
    callBackToParent(false, true);
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth className="m-14">
      <div className="p-4">
        <div className="flex justify-around mt-5">
          <div className="w/2 justify-center">
            <Button variant="contained" disableElevation onClick={handleClose}>ยกเลิก</Button>
          </div>
          <div className="w/2 justify-center">
            <AcceptButton variant="contained" onClick={handleAccept}>ตกลง</AcceptButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ConfirmModal
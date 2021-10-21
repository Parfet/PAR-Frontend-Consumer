import React, { useState, useEffect } from 'react'
import { TextField, Dialog, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import { RegularText } from '../../../../core/config/textStyle'

interface Props {
  showModal: boolean
  callBackToPartyList: Function
  text? :String
}

const DeclineModal = (props: Props) => {
  const { showModal, callBackToPartyList, text } = props
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(showModal)
  })

  const handleClose = () => {
    setOpen(false); 
    callBackToPartyList(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xs">
      <div className="p-4">
        <div className="flex justify-center">
          <CancelIcon style={{ color: "#AC3B31", fontSize: '48px' }} />
        </div>
        <div className="mt-3 mb-5">
          <RegularText> { text || 'คำขอเข้าร่วมถูกปฏิเสธ' } </RegularText>
        </div>
        <div className="flex justify-center">
          <Button variant="contained" disableElevation onClick={handleClose}>ปิด</Button>
        </div>
      </div>
    </Dialog>
  )
}


export default DeclineModal

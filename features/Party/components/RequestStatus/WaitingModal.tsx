import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { TextField, Dialog, Button } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { withStyles } from '@material-ui/styles';

import { RegularText } from '../../../../core/config/textStyle'

interface Props {
  showModal: boolean
  callBackToPartyList: Function
}

const JoinButton = withStyles(() => ({
  root: {
    backgroundColor: "#34C759",
    color: "white",
    '&:hover': {
      color: "white",
      backgroundColor: "#34C759",
    },
  },
}))(Button);

const WaitingModal = (props: Props) => {
  const { showModal, callBackToPartyList } = props
  const router = useRouter()
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(showModal)
  })

  const handleClose = () => {
    setOpen(false);
    callBackToPartyList(false);
  };

  const handleClick = () => {
    router.push('/party/request')
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xs">
      <div className="p-4">
        <div className="flex justify-center">
          <ErrorIcon style={{ color: "#F4B740", fontSize: '48px' }} />
        </div>
        <div className="mt-3 mb-5">
          <RegularText> คุณได้ส่งคำขอเข้าร่วมปาร์ตี้นี้เรียบร้อยแล้ว </RegularText> <br />
          <RegularText> สามารถกด "เพิ่มเติม" เพื่อดูคำร้องเพิ่มได้ </RegularText>
        </div>
        <div className="flex justify-between mt-3">
          <div className="w/2 justify-center">
            <Button variant="contained" disableElevation onClick={handleClose}>ปิด</Button>
          </div>
          <div className="w/2 justify-center">
            <JoinButton variant="contained" onClick={handleClick}>เพิ่มเติม</JoinButton>
          </div>
        </div>
      </div>
    </Dialog>
  )
}


export default WaitingModal

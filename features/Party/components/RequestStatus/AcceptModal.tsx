import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { withStyles } from '@material-ui/styles';
import { TextField, Dialog, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { Party } from '../../../../core/constant/type'
import { RegularText } from '../../../../core/config/textStyle'

interface Props {
  party: Party
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

const AcceptModal = (props: Props) => {
  const { showModal, callBackToPartyList, party } = props
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
    router.push('/party/' + party.party_id)
  };
    
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xs">
      <div className="p-4">
        <div className="flex justify-center">
          <CheckCircleIcon style={{ color: "#62DE81", fontSize: '48px' }} />
        </div>
        <div className="mt-3 mb-5 text-center">
          <RegularText> คุณเข้าร่วมปาร์ตี้ "{party.party_name}" แล้ว </RegularText> <br />
          <RegularText> กดเข้าสู่ปาร์ตี้ เพื่อไปยังปาร์ตี้ "{party.party_name}" </RegularText>
        </div>
        <div className="flex justify-between mt-3">
          <div className="w/2 justify-center">
            <Button variant="contained" disableElevation onClick={handleClose}>ปิด</Button>
          </div>
          <div className="w/2 justify-center">
            <JoinButton variant="contained" onClick={handleClick}>เข้าสู่ปาร์ตี้</JoinButton>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default AcceptModal

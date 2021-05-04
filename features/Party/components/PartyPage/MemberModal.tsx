import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { 
  Button, 
  Dialog, 
  } from '@material-ui/core';
  import _ from 'lodash'

import { SubHeader, NormalText } from '../../../../core/config/textStyle'
import { AdminPartyAction } from '../../../../core/constant/enum'
import ConfirmModal from '../../../../core/components/ConfirmModal'
import { mockPartyMember } from '../../../../core/config/mockData.js'

type MemberDetail = {
  memberId :string
  imageURL :string
  username :string
  interestTag :string[]
  rating :number
}

interface Props {
  memberDetail :MemberDetail
  showModal :boolean
  indexMember: number
  callBackToMemberParty :(value) => void
}

const MemberModal = (props :Props) => {
  const { indexMember, memberDetail, callBackToMemberParty, showModal } = props
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [typeAction, setTypeAction] = useState(undefined);
  const [confirmText, setConfirmText] = useState("");

  const borderColor =
    indexMember === -1 ? 'border-cusYellow' :
    indexMember % 3 === 0 ? 'border-cusLightOrange' :
      indexMember % 3 === 1 ? 'border-cusDarkRed' :
        indexMember % 3 === 2 ? 'border-cusBrown' : ''

  useEffect(() => {
    setOpen(showModal)
  })

  const handleClose = () => {
    setOpen(false);
    callBackToMemberParty(false)
  };

  const givePermission = () => {
    setConfirmText("ต้องการให้สิทธิ " + memberDetail.username + " เป็นเจ้าของปาร์ตี้")
    setOpenConfirm(true)
    setTypeAction(AdminPartyAction.GIVE_PERMISSION)
  }
  
  const kickMember = () => {
    setConfirmText("ต้องการลบ " + memberDetail.username + " ออกจากปาร์ตี้")
    setOpenConfirm(true)
    setTypeAction(AdminPartyAction.KICK)
  }

  const givePermissionAPI = () => {
    console.log(memberDetail)
    callBackToMemberParty(false)
    //Do sth
  }

  const kickMemberAPI = () => {
    console.log(memberDetail)
    callBackToMemberParty(false)
    //Do sth
  }

  const callBackFromConfirm = (open, value) => {
    setOpenConfirm(open)
    if (value){
      if (typeAction === AdminPartyAction.GIVE_PERMISSION){
        givePermissionAPI()
      }else if (typeAction === AdminPartyAction.KICK){
        kickMemberAPI()
      }
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth className="m-14">
        <div className="p-4">
          <div className="flex justify-center">
            <SubHeader bold> {memberDetail.username} </SubHeader>
          </div>
          <div className={`mx-14 my-3 text-center border-4 rounded-30 ${borderColor}`}>
            <Image
              alt={memberDetail.username}
              width={"80px"}
              height={"80px"}
              src={memberDetail.imageURL || mockPartyMember[0].imageURL}
              layout="responsive"
              objectFit="cover"
              className="rounded-25"
            />
          </div>
          <div className="flex justify-start mt-6 mb-2">
            <NormalText bold> สิ่งที่สนใจ </NormalText>
          </div>
          <div className="flex flex-wrap justify-start">
            {
              _.map(memberDetail.interestTag, (data) => (
                <NormalText className="flex flex-wrap content-center bg-gray-300 rounded-5 px-4 py-1 m-1 ">
                  {data}
                </NormalText>
              ))
            }
          </div>
          <div className="flex justify-start mt-4">
            <div className="w-1/2 flex items-center">
              <NormalText bold > ให้สิทธิเป็น <br /> เจ้าของปาร์ตี้ </NormalText>
            </div>
            <div className="w-1/2 flex justify-center">
              <Button variant="contained" disableElevation onClick={givePermission} color="secondary">ให้สิทธิ</Button>
            </div>
          </div>
          <div className="flex justify-start mt-2">
            <div className="w-1/2 flex items-center">
              <NormalText bold> ลบสมาชิก </NormalText>
            </div>
            <div className="w-1/2 flex justify-center">
              <Button variant="contained" disableElevation onClick={kickMember} color="secondary">ลบ</Button>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <Button variant="contained" disableElevation onClick={handleClose} >ปิด</Button>
          </div>
        </div>
      </Dialog>
      {
        true ?
          <ConfirmModal
            confirmText={confirmText}
            showModal={openConfirm}
            callBackToParent={callBackFromConfirm}
            />
          : <></>
      }
    </>
  );
}

export default MemberModal
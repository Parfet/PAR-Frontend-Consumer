import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import { 
  Button, 
  Dialog, 
  } from '@material-ui/core';
  import _ from 'lodash'

import { User, Tag } from '../../../../core/constant/type'
import { SubHeader, NormalText } from '../../../../core/config/textStyle'
import { AdminPartyAction } from '../../../../core/constant/enum'
import ConfirmModal from '../../../../core/components/ConfirmModal'
import { mockPartyMember } from '../../../../core/config/mockData.js'
import { useUser } from '../../../../core/context/auth_context'
import { useParty }  from '../../contexts/party_context'
import apiParty  from '../../services/apiParty'
import { StatusCodes } from 'http-status-codes';

interface Props {
  memberDetail: User
  isAdmin?: boolean
  showModal: boolean
  indexMember: number
  mode?: string
  callBackToMemberParty: (value) => void
}

const MemberModal = (props :Props) => {
  const router = useRouter()
  const { indexMember, memberDetail, callBackToMemberParty, showModal, isAdmin, mode } = props
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [typeAction, setTypeAction] = useState(undefined);
  const [confirmText, setConfirmText] = useState("");
  const partyContext = useParty()
  const userContext = useUser()

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

  const givePermissionAPI = async () => {
    try {
      const res = await apiParty.updateParty(partyContext.currentParty, partyContext.currentParty.party_id, memberDetail.user_id)
      if (res.status === StatusCodes.OK) {
        callBackToMemberParty(false)
        partyContext.getPartyByPartyId(partyContext.currentParty.party_id)
      }
    } catch (error) {
      if (error.response?.status) {
        callBackToMemberParty(false)
        router.push('/party/me')
      }
    }
  }

  const kickMemberAPI = async () => {
    console.log(memberDetail)
    try {
      const res = await apiParty.kickMember(partyContext.currentParty.party_id, memberDetail.user_id)
      if (res.status === StatusCodes.OK) {
        callBackToMemberParty(false)
        partyContext.getPartyByPartyId(partyContext.currentParty.party_id)

      }
    } catch (error) {
      if (error.response?.status) {
        callBackToMemberParty(false)
        router.push('/party/me')
      }
    }
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
            <SubHeader bold> {memberDetail.display_name} </SubHeader>
          </div>
          <div className={`mx-14 my-3 text-center border-4 rounded-30 ${borderColor}`}>
            <Image
              alt={memberDetail.display_name}
              width={"80px"}
              height={"80px"}
              src={memberDetail.image_url || "/images/default_user.jpg"}
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
              _.size(memberDetail.interested_tag) === 0 ?
                <NormalText>ไม่มี Tag ที่สนใจ</NormalText>
                :
                _.map(memberDetail.interested_tag, (data: Tag) => (
                  <NormalText className="flex flex-wrap content-center bg-gray-300 rounded-5 px-4 py-1 m-1 ">
                    {data.tag_name}
                  </NormalText>
                ))
            }
          </div>
          {
            !(indexMember === -1) && (userContext.userData.user_id === partyContext.currentParty.head_party.user_id) && mode != "view"
            ? <>
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
              </> : <></>
          }
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
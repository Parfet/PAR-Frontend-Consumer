import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { withStyles } from '@material-ui/core/styles';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import {
  SubHeader,
  NormalText,
  SmallText,
  TinyText
} from '../../../core/config/textStyle'

const JoinButton = withStyles(() => ({
  root: {
    backgroundColor: "#34C759",
    '&:hover': {
      backgroundColor: "#34C759",
    },
  },
}))(Button);

interface Props {
  partyId: string
  partyName: string
  restaurantName: string
  timeToGo: string
  promotion: string
  interestTag: Array<string>
  currentMember: number
  maxMember: number
  showModal: boolean
  callBackToPartyList: Function
}

const PartyModal = (props: Props) => {
  const { showModal, callBackToPartyList, partyId, partyName, restaurantName, timeToGo, promotion, interestTag, currentMember, maxMember } = props
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(showModal)
  })

  const handleClose = () => {
    setOpen(false);
    callBackToPartyList(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <div className="p-4">
          <div className="flex flex-col justify-center">
            <SubHeader bold className="text-left mb-2">
              {partyName}
            </SubHeader>
            <Image
              width={"auto"}
              height={"auto"}
              src="/images/tidmun.webp"
              className="rounded-lg object-fill"
            />
            <div className="flex flex-wrap justify-center h-8 mt-3 ">
              <div className="flex items-center">
              <PinDropOutlinedIcon className="mr-2" />
              <NormalText className="text-center">
                {restaurantName}
              </NormalText>
              </div>
            </div>
            <div className="flex flex-wrap justify-center h-8 mt-3 ">
              <div className="flex items-center bg-cusLightYellow rounded-lg px-3">
                <QueryBuilderOutlinedIcon className="mr-2" />
                <NormalText className="text-center ">
                  {timeToGo}
                </NormalText>
              </div>
            </div>
            <div className="mt-2 py-1 text-center">
              <NormalText className="pr-16">
                Promotion
              </NormalText>
              <SmallText className="pl-16">
                {promotion}
              </SmallText>
            </div>
            <div className="flex flex-wrap justify-center h-12 my-2">
              {
                interestTag.map((data) => (
                  <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-md px-3 py-1 m-1 ">
                    {data}
                  </TinyText>
                ))
              }
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="w/2 justify-center">
              <JoinButton variant="contained">เข้าร่วม</JoinButton>
            </div>
            <div className="w/2 justify-center">
              <Button variant="contained" disableElevation onClick={handleClose}>ยกเลิก</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default PartyModal

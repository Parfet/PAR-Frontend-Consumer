import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { TextField, Dialog, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';

import {
  SubHeader,
  NormalText,
  SmallText,
  TinyText
} from '../../../core/config/textStyle'
import { partyType } from '../../../core/config/enum'
import InputField from '../components/InputField'

interface Props {
  partyId: string
  partyName: string
  restaurantName: string
  timeToGo: string
  promotion: string
  interestTag: Array<string>
  currentMember: number
  maxMember: number
  partyTypeProp: string
  showModal: boolean
  callBackToPartyList: Function
}

const JoinButton = withStyles(() => ({
  root: {
    backgroundColor: "#34C759",
    '&:hover': {
      backgroundColor: "#34C759",
    },
  },
}))(Button);

const useStyles = makeStyles({
  root: {
    [`& fieldset`]: {
      borderRadius: 25,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28 !important",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28"
    },
  },
});

const PartyModal = (props: Props) => {
  const { showModal, callBackToPartyList, partyId, partyName, restaurantName, timeToGo, promotion, interestTag, currentMember, maxMember, partyTypeProp } = props
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [passcode, setPasscode] = useState('')

  useEffect(() => {
    setOpen(showModal)
  })

  const handleClose = () => {
    setOpen(false);
    callBackToPartyList(false);
  };

  const handleClick = () => {
    console.log(passcode)
  }

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
            <div className="flex flex-wrap justify-center h-8 mt-3">
              <div className="flex items-center">
              <PinDropOutlinedIcon className="mr-2" />
              <NormalText className="text-center">
                {restaurantName}
              </NormalText>
              </div>
            </div>
            <div className="flex flex-wrap justify-center h-8 mt-3">
              <div className="flex items-center bg-cusDarkRed rounded-lg px-3">
                <QueryBuilderOutlinedIcon className="mr-2" style={{ color: 'white' }} />
                <NormalText className="text-center " white>
                  {timeToGo}
                </NormalText>
              </div>
            </div>
            <div className="flex flex-wrap justify-center h-8 mt-3">
              <div className="flex flex-col px-2 py-1 bg-cusRed text-center rounded-lg">
                <NormalText white>
                  Promotion
                </NormalText >
                <SmallText white>
                  {promotion}
                </SmallText>
              </div>
            </div>
            <div className="flex flex-wrap justify-center h-12 mt-3">
              {
                interestTag.map((data) => (
                  <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-md px-3 py-1 m-1 ">
                    {data}
                  </TinyText>
                ))
              }
            </div>
          </div>
          {
            partyTypeProp === partyType.PUBLIC ? 
              <InputField label="รหัสผ่าน" className="text-center">
                <TextField
                  id="password"
                  name="password"
                  variant="outlined"
                  size="small"
                  type="text"
                  value={passcode}
                  className={classes.root}
                  onChange={(e) => setPasscode(e.target.value)}
                  inputProps={{ minLength: "6", maxLength: "6", pattern: "[0-9]*" }}
                  required
                />
              </InputField>
              : <></>
          }
          <div className="flex justify-between mt-5">
            <div className="w/2 justify-center">
              <Button variant="contained" disableElevation onClick={handleClose}>ยกเลิก</Button>
            </div>
            <div className="w/2 justify-center">
              <JoinButton variant="contained" onClick={handleClick}>เข้าร่วม</JoinButton>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default PartyModal

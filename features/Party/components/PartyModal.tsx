import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import { TextField, Dialog, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import { StatusCodes } from 'http-status-codes';
import _ from "lodash"
import dayjs from 'dayjs'

import {
  SubHeader,
  NormalText,
  SmallText,
  TinyText,
  RegularText
} from '../../../core/config/textStyle'
import { ErrorMessage } from '../../../core/constant/constant'
import { PartyType, Errors } from '../../../core/constant/enum'
import { Party } from '../../../core/constant/type'
import { useUser } from '../../../core/context/auth_context'
import { useRestaurant } from '../../Restaurant/contexts/restaurant_context'
import InputField from '../../../core/components/InputField'
import apiParty from '../services/apiParty'
import { useParty } from '../contexts/party_context'
import { UIDateLayout } from '../../../core/constant/constant'

interface Props {
  party :Party
  showModal: boolean
  callBackToPartyList: Function
  mode?: String
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
  const { showModal, callBackToPartyList, party, mode } = props
  const classes = useStyles();
  const router = useRouter()
  const partyContext = useParty()
  const authContext = useUser()
  const restaurantContext = useRestaurant()
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState('')
  const [passcode, setPasscode] = useState('')
  const [disable, setDisable] = useState(false)
  
  useEffect(() => {
    if (_.size(party.members) >= party.max_member){
      setDisable(true)
    }
    setOpen(showModal)
  })
  
  const handleClose = async () => {
    if (mode == "quick"){
      await partyContext.cancelJoinParty(party.party_id)
    }
    setOpen(false);
    callBackToPartyList(false);
  };
  
  const handleClick = async () => {
    if (passcode.length === 6 || party.party_type === PartyType.PUBLIC){
      setAlertText('')
      //TODO: Move to context
        const res = await apiParty.joinParty(party.party_id, passcode)
      if (res.response && res.response.status === StatusCodes.BAD_REQUEST) {
        const message = res.response.data.message
        if (message === Errors.PASSCODE_INCORRECT) {
          setAlertText(ErrorMessage.PASSCODE_INCORRECT)
        } else if (message === Errors.PARTY_NOT_FOUND || message === Errors.ALREADY_JOIN_PARTY) {
          setOpen(false);
          callBackToPartyList(false);
        } else {
          router.push('/')
        }
      }else if (res.status === StatusCodes.OK) {
        setOpen(false);
        callBackToPartyList(false);
      }
    }else {
      setAlertText("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร")
    }
  }

  const handleChange = (e) => {
    setPasscode(e.target.value)
    setAlertText('')
  }

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <div className="p-4">
          <div className="flex flex-col justify-center">
            <div className="flex justify-between">
              <SubHeader bold className="text-left mb-2" isCut>
                {party.party_name}
              </SubHeader>
              {
                mode == "quick" ?
                  <NormalText>
                    สมาชิก {party.member_amount} / {party.max_member}
                  </NormalText>
                : <></>
              }
            </div>
            <Image
              width={300}
              height={200}
              src={
                  ( mode == "quick" && party.restaurant.restaurant_photo_ref) || restaurantContext.currentRestaurant.photos ?
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=
                    ${mode == "quick" ? party.restaurant.restaurant_photo_ref : restaurantContext.currentRestaurant.photos[0].photo_reference}
                    &key=AIzaSyDrsNg9fJrPlKhGh4BzGfLNA3khHeqg-Js`
                : "/images/default_restaurant.png"}
              className="rounded-lg object-fill"
            />
            {
              mode == "quick" ?
              <div className="flex justify-center h-8 mt-3 mb-3">
                <SubHeader bold>
                  ร้าน {party.restaurant.restaurant_name}
                </SubHeader >
              </div>
              : <></>
            }
            <div className={`flex flex-wrap justify-center h-8 ${mode == "quick" ? "" : 'mt-3'}`}>
              <div className="flex flex-col items-center">
                <RegularText bold>
                  หัวข้อที่สนใจ
                </RegularText >
                <NormalText className="text-center" isCut>
                    {party.interested_topic}
                </NormalText>
              </div>
            </div>
            <div className="flex flex-wrap justify-center h-8 mt-3">
              <div className="flex items-center bg-cusDarkRed rounded-5 px-3">
                <QueryBuilderOutlinedIcon className="mr-2" style={{ color: 'white' }} />
                <NormalText className="text-center " white>
                  {dayjs(party.schedule_time).format(UIDateLayout.TIMESTAMP_WITH_DAY)}
                </NormalText>
              </div>
            </div>
            <div className="flex flex-wrap justify-center h-12 mt-3">
              {
                _.map(party.interest_tags, (data) => (
                  <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-5 px-3 py-1 m-1 ">
                    {data.label}
                  </TinyText>
                ))
              }
            </div>
          </div>
          {
            party.party_type === PartyType.PRIVATE ? 
              <>
                <InputField label="รหัสผ่าน" className="text-center">
                  <TextField
                    id="password"
                    name="password"
                    variant="outlined"
                    size="small"
                    type="text"
                    value={passcode}
                    className={classes.root}
                    onChange={(e) => handleChange(e)}
                    inputProps={{ maxLength: "6", pattern: "[0-9]*" }}
                    required
                    />
                </InputField>
                {
                  alertText != '' ?
                    <NormalText className="ml-3 mt-1" style={{ color: 'red' }}>{alertText}</NormalText>
                    : <></>
                }
              </>
              : <></>
          }
          <div className="flex justify-between mt-3">
            <div className="w/2 justify-center">
              <Button variant="contained" disableElevation onClick={handleClose}>ยกเลิก</Button>
            </div>
            <div className="w/2 justify-center">
              <JoinButton variant="contained" onClick={handleClick} disabled={disable}>เข้าร่วม</JoinButton>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default PartyModal

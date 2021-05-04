import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import { TextField, Dialog, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import { StatusCodes } from 'http-status-codes';
import _ from "lodash"

import {
  SubHeader,
  NormalText,
  SmallText,
  TinyText
} from '../../../core/config/textStyle'
import { ErrorMessage } from '../../../core/constant/constant'
import { PartyType, Errors } from '../../../core/constant/enum'
import { Party } from '../../../core/constant/type'
import { authContext } from '../../../core/context/auth_context'
import InputField from '../components/InputField'
import apiParty from '../services/apiParty'
interface Props {
  party :Party
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
  const { showModal, callBackToPartyList, party } = props
  const classes = useStyles();
  const router = useRouter()
  const contextUser = useContext(authContext)
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState('')
  const [passcode, setPasscode] = useState('')
  const [disable, setDisable] = useState(false)
  
  useEffect(() => {
    console.log("🚀 ~ file: PartyModal.tsx ~ line 68 ~ useEffect ~ _.size(party.members)", _.size(party.members))
    if (_.size(party.members) >= party.max_member){
      setDisable(true)
    }
    setOpen(showModal)
  })
  
  const handleClose = () => {
    setOpen(false);
    callBackToPartyList(false);
  };
  
  const handleClick = async () => {
    console.log("🚀 ~ file: PartyModal.tsx ~ line 65 ~ PartyModal ~ disable", disable)
    if (passcode.length === 6 || party.party_type === PartyType.PUBLIC){
      setAlertText('')
      try {
        const res = await apiParty.joinParty(party.party_id, contextUser.userId,passcode)
        if (res.status === StatusCodes.OK) {
          handleClose();
        }
      } catch (error) {
        if (error.response?.status === StatusCodes.BAD_REQUEST) {
          const message = error.response?.data.message
            if (message === Errors.PASSCODE_INCORRECT) {
              setAlertText(ErrorMessage.PASSCODE_INCORRECT)
            }else if (message === Errors.PARTY_NOT_FOUND || message === Errors.ALREADY_JOIN_PARTY) {
              handleClose();
            } else {
              router.push('/')
            }
          }
        }
    }else {
      setAlertText("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร")
    }
  }

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <div className="p-4">
          <div className="flex flex-col justify-center">
            <SubHeader bold className="text-left mb-2">
              {party.party_name}
            </SubHeader>
            <Image
              width={"auto"}
              height={"auto"}
              src="/images/tidmun.webp"
              className="rounded-lg object-fill"
            />
            <div className="flex flex-wrap justify-center h-8 mt-3">
              <div className="flex flex-col items-center">
                <NormalText bold>
                  หัวข้อที่สนใจ
                </NormalText >
                <NormalText className="text-center">
                    {party.interested_topic}
                </NormalText>
              </div>
            </div>
            <div className="flex flex-wrap justify-center h-8 mt-3">
              <div className="flex items-center bg-cusDarkRed rounded-5 px-3">
                <QueryBuilderOutlinedIcon className="mr-2" style={{ color: 'white' }} />
                <NormalText className="text-center " white>
                  {party.schedule_time}
                </NormalText>
              </div>
            </div>
            <div className="flex flex-wrap justify-center h-8 mt-3">
              <div className="flex flex-col px-2 py-1 bg-cusRed text-center rounded-5">
                <NormalText white>
                  Promotion
                </NormalText >
                <SmallText white>
                  {party.promotion || "Mock Promotion"}
                </SmallText>
              </div>
            </div>
            <div className="flex flex-wrap justify-center h-12 mt-3">
              {
                _.map(party.interested_topic, (data, index) => (
                  <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-5 px-3 py-1 m-1 ">
                    {data}
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
                    onChange={(e) => setPasscode(e.target.value)}
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
          <div className="flex justify-between mt-5">
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

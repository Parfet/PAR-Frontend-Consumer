import React, { useState } from 'react';
import Image from 'next/image'
import dayjs from 'dayjs'
import {
  makeStyles,
  createStyles,
  Paper,
} from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import _ from "lodash"

import {
  Header,
  SubHeader,
  NormalText,
  SmallText,
  TinyText,
  RegularText
} from '../../../core/config/textStyle'
import { UIDateLayout } from '../../../core/constant/constant'
import { PartyRequestStatus } from '../../../core/constant/enum'
import { Party } from '../../../core/constant/type'
import { useParty } from '../contexts/party_context'
import AcceptModal from './RequestStatus/AcceptModal'
import DeclineModal from './RequestStatus/DeclineModal'
import WaitingModal from './RequestStatus/WaitingModal'
import PartyModal from './PartyModal'

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      margin: '1.5em',
      padding: '0.75em 1.5em',
      height: '180px'
    },
  }),
)

interface Props {
  party :Party
}

const CardParty = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);
  const [openWaiting, setOpenWaiting] = useState(false);
  const [declineWord, setDeclineWord] = useState(null)
  const classes = useStyles();
  const partyContext = useParty()
  const { party } = props

  const handleClickOpen = async () => {
    if(party.members.length == party.max_member){
      setDeclineWord("ปาร์ตี้นี้มีจำนวนถึงจำนวนผู้เข้าร่วมสูงสุดแล้ว")
      setOpenDecline(true)
    }else {
      let status = await partyContext.checkJoinStatus(party.party_id)
      if (status === PartyRequestStatus.STATUS_DECLINE){
        setDeclineWord(null)
        setOpenDecline(true)
      } else if (status === PartyRequestStatus.STATUS_ACCEPT){
        setOpenAccept(true)
      } else if (status === PartyRequestStatus.STATUS_WAITING){
        setOpenWaiting(true)
      } else {
        setOpenModal(true)
      }
    }
  };

  const valueFromPartyModal = (value) => {
    setOpenDecline(value)
    setOpenAccept(value)
    setOpenWaiting(value)
    setOpenModal(value)
  }

  return (
    <>
      <Paper className={classes.paper} onClick={handleClickOpen}>
        <SubHeader bold isCut>{party.party_name} </SubHeader>
        <div className="flex flex-col py-1 mt-1">
          <div className="flex justify-between items-center px-2 py-1 bg-cusLightOrange rounded-t-5">
            <RegularText className="text-center" white>
              หัวข้อที่สนใจ :
            </RegularText>
            <NormalText className="text-center" white isCut>
              {party.interested_topic}
            </NormalText>
          </div>
          <div className="flex justify-between items-center bg-cusDarkRed rounded-b-5 py-1 px-2">
            <QueryBuilderOutlinedIcon className="mr-2" style={{ color: 'white' }}/>
            <SmallText white>
              {dayjs(party.schedule_time).format(UIDateLayout.TIMESTAMP_WITH_DAY)}
            </SmallText>
          </div>
        </div>
        <div className="flex flex-row-1 h-7 space-x-1 my-1">
          {
            _.map(party.interest_tags, (data, index) => (
              <>
                {
                  index < 3 ?
                    <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-5 px-3">
                      {index < 2 ? `${data.label}` : `+${party.interest_tags.length - 2}`}
                    </TinyText>
                    : <></>
                }
              </>
            ))
          }
        </div>
        <div className="flex justify-end">
          <NormalText>
            {_.size(party.members)}/{party.max_member}
            <PeopleAltOutlinedIcon />
          </NormalText>
        </div>
      </Paper>
      <DeclineModal 
        showModal={openDecline}
        callBackToPartyList={valueFromPartyModal}
        text={declineWord}
      />
      <WaitingModal
        showModal={openWaiting}
        callBackToPartyList={valueFromPartyModal}
      />
      <AcceptModal 
        showModal={openAccept}
        callBackToPartyList={valueFromPartyModal}
        party={party}
      />
      <PartyModal
        showModal={openModal}
        callBackToPartyList={valueFromPartyModal}
        party={party}
      />
    </>
  );
}

export default CardParty

import React, { useState } from 'react';
import Image from 'next/image'
import {
  makeStyles,
  createStyles,
  Paper,
} from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import _ from "lodash"

import {
  SubHeader,
  NormalText,
  SmallText,
  TinyText
} from '../../../core/config/textStyle'
import { Party } from '../../../core/constant/type'
import PartyModal from './PartyModal'

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      margin: '1.5em',
      padding: '0.75em 1.5em',
      height: '180px'
    },
  }),
);
interface Props {
  party :Party
}

const CardParty = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const { party } = props

  const handleClickOpen = () => {
    setOpenModal(true)
  };

  const valueFromPartyModal = (value) => {
    setOpenModal(value)
  }

  return (
    <>
      <Paper className={classes.paper} onClick={handleClickOpen}>
        <SubHeader bold>
          {party.party_name}
        </SubHeader>
        <div className="flex py-1">
          <div className="w-1/2">
            <Image
              alt="complex"
              width={"auto"}
              height={"100%"}
              src="/images/tidmun.webp"
              className="rounded-l-lg"
            />
          </div>
          <div className="w-1/2">
            <div className="flex flex-wrap justify-center h-9 bg-cusLightOrange rounded-tr-lg">
              <div className="flex items-center px-2 py-1">
                <NormalText white>
                  {party.interested_topic}
                </NormalText>
              </div>
            </div>
            <div className="flex flex-wrap bg-cusDarkRed justify-center h-7">
              <div className="flex items-center px-2">
                <QueryBuilderOutlinedIcon className="mr-2" style={{ color: 'white' }}/>
                <SmallText white>
                  {party.schedule_time}
                </SmallText>
              </div>
            </div>
            <div className="flex flex-col h-9 px-2 py-1 bg-cusRed text-center rounded-br-lg">
              <NormalText white>
                Promotion
              </NormalText >
              <SmallText white>
                {party.promotion || "Mock Promotion"}
              </SmallText>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row-1 space-x-1">
            {
              _.map(party.interested_tag, (data, index) => (
                <>
                  {
                    index < 3 ?
                      <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-5 px-3">
                        {index < 2 ? `${data}` : `+${data.length}`}
                      </TinyText>
                      : <></>
                  }
                </>
              ))
            }
          </div>
          <NormalText>
            {party.members.length}/{party.max_member}
            <PeopleAltOutlinedIcon />
          </NormalText>
        </div>
      </Paper>
      <PartyModal
        showModal={openModal}
        callBackToPartyList={valueFromPartyModal}
        party={party}
      />
    </>
  );
}

export default CardParty

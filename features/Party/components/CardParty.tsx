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

import {
  SubHeader,
  NormalText,
  SmallText,
  TinyText
} from '../../../core/config/textStyle'
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
  partyId: string
  partyName: string
  restaurantName: string
  timeToGo: string
  promotion: string
  interestTag: Array<string>
  currentMember: number
  maxMember: number
  partyType: string
}

const CardParty = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const { partyId, partyName, restaurantName, timeToGo, promotion, interestTag, currentMember, maxMember, partyType } = props

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
          {partyName}
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
                <PinDropOutlinedIcon className="mr-2" style={{ color: 'white' }}/>
                <NormalText white>
                  {restaurantName}
                </NormalText>
              </div>
            </div>
            <div className="flex flex-wrap bg-cusDarkRed justify-center h-7">
              <div className="flex items-center px-2">
                <QueryBuilderOutlinedIcon className="mr-2" style={{ color: 'white' }}/>
                <SmallText white>
                  {timeToGo}
                </SmallText>
              </div>
            </div>
            <div className="flex flex-col h-9 px-2 py-1 bg-cusRed text-center rounded-br-lg">
              <NormalText white>
                Promotion
              </NormalText >
              <SmallText white>
                {promotion}
              </SmallText>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row-1 space-x-1">
            {
              interestTag.map((data, index) => (
                <>
                  {
                    index < 3 ?
                      <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-md px-3">
                        {index < 2 ? `${data}` : `+${data.length}`}
                      </TinyText>
                      : <></>
                  }
                </>
              ))
            }
          </div>
          <NormalText>
            {currentMember}/{maxMember}
            <PeopleAltOutlinedIcon />
          </NormalText>
        </div>
      </Paper>
      <PartyModal
        showModal={openModal}
        callBackToPartyList={valueFromPartyModal}
        partyId={partyId}
        partyName={partyName}
        restaurantName={restaurantName}
        timeToGo={timeToGo}
        promotion={promotion}
        interestTag={interestTag}
        currentMember={currentMember}
        maxMember={maxMember}
        partyTypeProp={partyType}
      />
    </>
  );
}

export default CardParty

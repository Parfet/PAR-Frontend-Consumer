import React from 'react';
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


interface Props {
  partyName: string
  restaurantName: string
  timeToGo: string
  promotion: string
  interestTag: Array<string>
  currentMember: number
  maxMember: number
}

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      margin: '1.5em',
      padding: '0.75em 1.5em',
      height: '180px'
    },
  }),
);

const CardParty = (props: Props) => {
  const classes = useStyles();
  const { partyName, restaurantName, timeToGo, promotion, interestTag, currentMember, maxMember } = props

  return (
    <Paper className={classes.paper}>
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
          <NormalText className="bg-cusGreen px-2 py-1 rounded-tr-lg">
            <PinDropOutlinedIcon className="mr-2" />
            {restaurantName}
          </NormalText>
          <SmallText className="px-2 py-0.5">
            <QueryBuilderOutlinedIcon className="mr-2" />
            {timeToGo}
          </SmallText> 
          <div className="bg-cusPink px-2 py-1 rounded-br-lg">
            <NormalText>
              Promotion
            </NormalText>
            <SmallText className="text-right">
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
                    { index < 2 ? `${data}`: `+${data.length}` }
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
  );
}

export default CardParty

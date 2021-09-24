import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  makeStyles,
  createStyles,
  Paper,
} from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import _ from "lodash"
import dayjs from 'dayjs'

import {
  SubHeader,
  NormalText,
  SmallText,
  TinyText
} from '../../../core/config/textStyle'
import { Party } from '../../../core/constant/type'
import { UIDateLayout } from '../../../core/constant/constant'

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
  party: Party
}

const CardMyParty = (props: Props) => {
  const router = useRouter()
  const classes = useStyles();
  const { party } = props

  const handleClick = () => {
    router.push('/party/'+party.party_id)
  };

  return (
    <>
      <Paper className={classes.paper} onClick={handleClick}>
        <div className="flex py-1">
          <div className="w-1/2 flex-col">
            <div>
              <Image
                alt="complex"
                width={"auto"}
                height={"100%"}
                src="/images/tidmun.webp"
                className="rounded-l-lg"
              />
            </div>
            <div className="flex flex-col h-7">
              <div className="text-center pr-2">
                <QueryBuilderOutlinedIcon className="mr-2" />
                <SmallText>
                  {dayjs(party.schedule_time).format(UIDateLayout.TIMESTAMP_WITH_DAY)}
                </SmallText>
              </div>
              <div className="text-center">
                <NormalText>
                  <PeopleAltOutlinedIcon />
                  {_.size(party.members)}/{party.max_member}
                </NormalText>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex-col ml-4">
            <SubHeader bold>
              {party.party_name}
            </SubHeader>
            <div className="flex mt-1">
              <NormalText>
                <LocationOnIcon />
                {party.restaurant_name || "Mock"}
              </NormalText>
            </div>
            <div className="mt-2">
              <NormalText>
                หัวข้อที่สนใจ: {party.interested_topic}
              </NormalText>
            </div>
            <div>
              <div className="flex justify-between">
                <div className="flex flex-row-1 space-x-1">
                  {
                    _.map(party.interest_tags, (data, index) => (
                      <>
                        {
                          index < 3 ?
                            <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-5 px-3 py-1">
                              {index < 2 ? `${data.label}` : `+${party.interest_tags.length - 2}`}
                            </TinyText>
                            : <></>
                        }
                      </>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div></div>
              <div className="flex items-center mt-2 ml-3">
                <NormalText bold>
                  {party.members[0].username || "Mock" }
                </NormalText>
              </div>
              <div className="flex mt-2 text-center bg-cusPurple rounded-30 p-3">
                <SmallText white>
                  99+
                </SmallText>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </>
  )
}

export default CardMyParty

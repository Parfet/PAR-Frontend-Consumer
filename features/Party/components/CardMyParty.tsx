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
  mode?: String
}

const CardMyParty = (props: Props) => {
  const router = useRouter()
  const classes = useStyles();
  const { party, mode } = props

  const handleClick = () => {
    if (!mode){
      router.push('/party/'+party.party_id)
    }
  };

  return (
    <>
      <Paper className={classes.paper} onClick={handleClick}>
        <div className="flex py-1">
          <div className="w-1/2 flex-col">
            <div>
              <Image
                alt="complex"
                layout={`fixed`}
                width={130}
                height={100}
                src={party.restaurant.restaurant_photo_ref ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${party.restaurant.restaurant_photo_ref}&key=AIzaSyDrsNg9fJrPlKhGh4BzGfLNA3khHeqg-Js`
                  : "/images/default_restaurant.png"}
                className="rounded-l-lg"
              />
            </div>
            <div className="flex flex-col h-7">
              <div className="text-center">
                <QueryBuilderOutlinedIcon className="mr-2" />
                <SmallText>
                  {dayjs(party.schedule_time).format(UIDateLayout.TIMESTAMP_WITH_DAY)}
                </SmallText>
              </div>
              {
                !mode?
                  <div className="text-center">
                    <NormalText>
                      <PeopleAltOutlinedIcon />
                      {_.size(party.members)}/{party.max_member}
                    </NormalText>
                  </div>
                :<></>
              }
            </div>
          </div>
          <div className="w-1/2 flex-col ml-4">
            <div className="flex">
              <SubHeader bold isCut>
                {party.party_name}
              </SubHeader>
            </div>
            <div className="flex mt-1">
              <NormalText isCut>
                <LocationOnIcon />
                {party.restaurant.restaurant_name || "Mock"}
              </NormalText>
            </div>
            <div className="flex flex-col my-2">
              <NormalText isCut>
                หัวข้อที่สนใจ:
              </NormalText>
              <NormalText isCut>
                {party.interested_topic}
              </NormalText>
            </div>
            <div>
              <div className="flex justify-between">
                <div className="flex flex-row-1 space-x-1">
                  {
                    _.map(party.interest_tags, (data, index) => (
                      <>
                        {
                          index < 2 ?
                            <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-5 px-3 py-1">
                              {index < 1 ? `${data.tag_name || data.label}` : `+${party.interest_tags.length - 1}`}
                            </TinyText>
                            : <></>
                        }
                      </>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-3">
              <div className="w-2/5">หัวปาร์ตี้</div>
              <div className="flex items-center ml-3 w-3/5">
                <NormalText bold isCut>
                  {party.head_party.display_name}
                </NormalText>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </>
  )
}

export default CardMyParty

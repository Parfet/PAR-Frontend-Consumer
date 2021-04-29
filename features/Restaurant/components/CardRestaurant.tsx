import React, { useContext } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import {
  makeStyles,
  createStyles,
  Paper,
} from '@material-ui/core';

import {
  SubTitle,
  SubHeader,
  NormalText,
} from '../../../core/config/textStyle'
import RatingStar from '../../../core/components/RatingStar'
import { RestaurantStatus } from '../../../core/constant/enum'
import { Restaurant } from '../../../core/constant/type'
import { restaurantContext } from '../contexts/restaurant_context'

const ImageWithFilter = styled(Image)`
  filter:  brightness(${props =>
              props.restaurantstatus === RestaurantStatus.RESTAURANT_OPEN 
                ? 1 
                : 0.40});
`

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      margin: '2em',
      height: '200px',
      width: 'auto',
      borderRadius: '5px'
    },
  }),
);
interface Props {
  restaurant: Restaurant
}

const RestaurantParty = (props: Props) => {
  const contextParty = useContext(restaurantContext)
  const router = useRouter()
  const classes = useStyles();
  const { restaurant } = props

  const selectRestaurant = () => {
    contextParty.setCurrentRestaurant(restaurant)
    router.push("/party")
  }
  return (
    <>
      <Paper className={classes.paper} onClick={selectRestaurant}>
        <div className="relative">
          {
            restaurant.status === RestaurantStatus.RESTAURANT_OPEN ? 
              <></>
            : <div className="absolute z-50 flex justify-center w-full h-full">
                <SubTitle className="flex items-center" white bold>
                  Close
                </SubTitle>
              </div>
          }
          <ImageWithFilter
            alt="complex"
            width={2.35}
            height={1}
            layout="responsive"
            src="/images/tidmun.webp"
            className="rounded-t-5"
            restaurantstatus={restaurant.status}
            />
        </div>
        <div className="flex flex-col mt-2">
          <SubHeader bold className="text-center">
            {restaurant.restaurant_name}
          </SubHeader>
          <div className="flex justify-between mx-2">
            <div>
              <RatingStar rating={4} />
            </div>
            <div className="pt-4 pr-3">
              <NormalText bold>
                {restaurant.price || '250'} บาท
              </NormalText>
            </div>

          </div>
        </div>
      </Paper>
    </>
  );
}

export default RestaurantParty

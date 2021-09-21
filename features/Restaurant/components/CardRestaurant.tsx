import React, { useContext } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import {
  makeStyles,
  createStyles,
  Paper,
  IconButton
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

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
  const contextRestaurant = useContext(restaurantContext)
  const router = useRouter()
  const classes = useStyles();
  const { restaurant } = props

  const selectRestaurant = () => {
    if (restaurant.status === RestaurantStatus.RESTAURANT_OPEN){
      contextRestaurant.setCurrentRestaurant(restaurant)
      router.push("/party")
    }
  }

  const selectRestaurantInfo = () => {
    contextRestaurant.setCurrentRestaurant(restaurant)
    router.push("/restaurant/info")
  }
  return (
    <>
      <Paper className={classes.paper} >
        <div className="z-50 absolute flex right-7" onClick={() => selectRestaurantInfo()}>
          <IconButton size="medium">
            <InfoIcon className="rounded-25 bg-white"/>
          </IconButton>
        </div>
        <div className="relative" onClick={selectRestaurant}>
          {
            restaurant.status === RestaurantStatus.RESTAURANT_OPEN ? 
              <></>
            : <div className="absolute z-40 flex justify-center w-full h-full">
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
          <SubHeader bold className="text-center px-2">
            {restaurant.name}
          </SubHeader>
          <div className="flex justify-between mx-2">
            <div>
              <RatingStar rating={restaurant.rating} />
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

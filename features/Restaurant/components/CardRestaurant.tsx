import React from 'react';
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
import Rating from '@material-ui/lab/Rating';

import {
  SubTitle,
  SubHeader,
  NormalText,
} from '../../../core/config/textStyle'
import RatingStar from '../../../core/components/RatingStar'
import { RestaurantStatus } from '../../../core/constant/enum'
import { Restaurant } from '../../../core/constant/type'
import { useRestaurant } from '../contexts/restaurant_context'

const ImageWithFilter = styled(Image)`
  filter:  brightness(${props =>
              props.restaurantstatus != RestaurantStatus.RESTAURANT_OPEN 
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
  const restaurantContext = useRestaurant()
  const router = useRouter()
  const classes = useStyles();
  const { restaurant } = props

  const selectRestaurant = () => {
    // if (restaurant.status === RestaurantStatus.RESTAURANT_OPEN){
    restaurantContext.setCurrentRestaurant(restaurant)
    restaurantContext.setSearchWord({ ...restaurantContext.searchWord, keyword: "", })
      router.push("/party")
    // }
  }

  const selectRestaurantInfo = () => {
    // restaurantContext.setCurrentRestaurant(restaurant)
    router.push(restaurant.map_url)
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
            restaurant.status != RestaurantStatus.RESTAURANT_OPEN ? 
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
            src={restaurant.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${restaurant.photos[0].photo_reference}&key=AIzaSyDrsNg9fJrPlKhGh4BzGfLNA3khHeqg-Js`
              : "/images/default_restaurant.png"}
            className="rounded-t-5"
            restaurantstatus={restaurant.status}
            />
        </div>
        <div className="flex flex-col mt-2 mx-2">
          <SubHeader bold isCut className="text-left">
            {restaurant.name}
          </SubHeader>
          <div className="flex justify-end">
            <Rating name="read-only" value={restaurant.rating} precision={0.5} readOnly />
          </div>
        </div>
      </Paper>
    </>
  );
}

export default RestaurantParty

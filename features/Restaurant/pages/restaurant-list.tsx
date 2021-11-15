import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { 
  Paper, 
  InputBase, 
  IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import _ from "lodash"

import { useUser } from '../../../core/context/auth_context'
import { useRestaurant } from '../contexts/restaurant_context'
import CardRestaurant from '../components/CardRestaurant'
import NoContent from '../../../core/components/NoContent'
import Loading from '../../../core/components/Loading'

const BackgroundRestaurantList = styled.div`
  background-color: #F8CE28;
  height: ${ props => props.height > 2 ? "auto" : '100vh'};
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '.5em 1em',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '25px',
    },
    input: {
      marginLeft: theme.spacing(3),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
);



const RestaurantList = () => {
  const classes = useStyles();
  const userContext = useUser();
  const restaurantContext = useRestaurant();
  const [noContentWord, setNoContentWord] = useState("กรุณาเช็คการเชื่อมต่ออีกครั้งครับ")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (userContext.location.lat == 0 && userContext.location.lng == 0) {
        let error = await userContext.getLocation()
        if (error) {
          setNoContentWord('กรุณาเปิดการเข้าถึงตำแหน่งที่ตั้งของคุณ')
        }else{
          let response = await restaurantContext.getRestaurants(userContext.location)
          if (response) setLoading(false)
        }
      }else{
        let response = await restaurantContext.getRestaurants(userContext.location)
        if (response) setLoading(false)
      }
    })()
  }, [])


  const formik = useFormik({
    initialValues: {
      restaurantName: ''
    },
    onSubmit: async (values) => {
      setLoading(true)
      let response = await restaurantContext.getRestaurants({ keyword : values.restaurantName})
      if (response) setLoading(false) 
      else {
        setLoading(false)
        setNoContentWord("ไม่พบร้าน " + values.restaurantName)
      }
    },
  });

  return (
    <BackgroundRestaurantList className="overscroll-auto pt-4 pb-10" height={_.size(restaurantContext.restaurants)}>
      <form onSubmit={formik.handleSubmit}>
        <Paper className={classes.root}>
          <InputBase
            id="restaurantName"
            name="restaurantName"
            className={classes.input}
            placeholder="ค้นหาร้านอาหาร"
            inputProps={{ 'aria-label': 'ค้นหาร้านอาหารiiiiiii' }}
            value={formik.values.restaurantName}
            onChange={formik.handleChange}
            error={formik.touched.restaurantName && Boolean(formik.errors.restaurantName)}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      { 
        loading ?
          <Loading isWhite />
        : 
        _.size(restaurantContext.restaurants)=== 0 ?
          <div className="flex justify-center flex-col w-full h-full pb-24">
            <NoContent text={noContentWord} white />
          </div>
        :
        _.map(restaurantContext.restaurants, (data, index) => (
          <CardRestaurant restaurant={data} key={index} />
        ))
      }
    </BackgroundRestaurantList>
  )
}

export default RestaurantList

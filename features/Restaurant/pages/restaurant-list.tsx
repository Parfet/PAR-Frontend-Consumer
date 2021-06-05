import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useObserver } from 'mobx-react-lite'
import { 
  Paper, 
  InputBase, 
  IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import _ from "lodash"

import { authContext } from '../../../core/context/auth_context'
import { restaurantContext } from '../contexts/restaurant_context'
import CardRestaurant from '../components/CardRestaurant'
import NoContent from '../../../core/components/NoContent'

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
  const contextAuth = useContext(authContext)
  const contextRestaurant = useContext(restaurantContext)
  const [noContentWord, setNoContentWord] = useState("กรุณาเช็คการเชื่อมต่ออีกครั้งครับ")

  useEffect(() => {
    contextRestaurant.getRestaurants()
    contextAuth.getUser()
  }, [contextRestaurant])

  const formik = useFormik({
    initialValues: {
      restaurant: ''
    },
    onSubmit: (values) => {
      setNoContentWord("ไม่พบร้าน " + values.restaurant)
      console.log("🚀 ~ file: restaurant-list.tsx ~ line 58 ~ RestaurantList ~ values", values.restaurant)
    },
  });

  return useObserver(() => (
    <BackgroundRestaurantList className="overscroll-auto pt-4 pb-10" height={_.size(contextRestaurant.restaurant)}>
      <form onSubmit={formik.handleSubmit}>
        <Paper className={classes.root}>
          <InputBase
            id="restaurant"
            name="restaurant"
            className={classes.input}
            placeholder="ค้นหาร้านอาหาร"
            inputProps={{ 'aria-label': 'ค้นหาร้านอาหาร' }}
            value={formik.values.restaurant}
            onChange={formik.handleChange}
            error={formik.touched.restaurant && Boolean(formik.errors.restaurant)}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      {
        _.size(contextRestaurant.restaurant)=== 0 ?
          <div className="flex justify-center flex-col w-full h-full pb-24">
            <NoContent text={noContentWord} white />
          </div>
        :
        _.map(contextRestaurant.restaurant, (data, index) => (
          <CardRestaurant restaurant={data} key={index} />
        ))
      }
    </BackgroundRestaurantList>
  ))
}

export default RestaurantList

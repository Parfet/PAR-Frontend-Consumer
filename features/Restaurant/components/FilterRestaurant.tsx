import React, { useState, useContext } from 'react'
import { Switch, Slider, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';

import FilterBar from '../../../core/components/FilterBar'
import { RegularText } from '../../../core/config/textStyle';
import { RestaurantStatus } from '../../../core/constant/enum';
import { restaurantContext } from '../contexts/restaurant_context'

const rating = [1, 2, 3, 4, 5]

const theme = createMuiTheme({
  overrides: {
    MuiSwitch: {
      switchBase: {
        color: "#FFFFFF"
      },
      colorSecondary: {
        "&$checked": {
          color: "#FFFFFF"
        }
      },
      track: {
        opacity: 1,
        backgroundColor: "#B5B5B5",
        "$checked$checked + &": {
          opacity: 1,
          backgroundColor: "#34C759"
        }
      }
    }
  }
});


interface Props {
  open: boolean
  callBackFormFilter: (value) => void
}

const FilterRestaurant = (props: Props) => {
  const contextRestaurant = useContext(restaurantContext)
  const { open, callBackFormFilter } = props
  const [value, setValue] = useState<number[]>([300, 500]);
  const [max, setMax] = useState<number>(500)
  const [min, setMin] = useState<number>(300)
  const [toggleSwitch, setToggleSwitch] = useState({
    available: true,
    promotion: true,
  })

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleSwitch({ ...toggleSwitch, [event.target.name]: event.target.checked });
  };


  const handleChangeValue = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
    setMin(newValue[0])
    setMax(newValue[1])
  };
  
  const changeMaxMinValue = (event: any, type: string) => {
    console.log("🚀 ~ file: FilterRestaurant.tsx ~ line 63 ~ changeMaxMinValue ~ event", event.target.value)
    if(type === "max"){
      setMax(event.target.value)
      setValue([min, event.target.value])
    }else{
      setMin(event.target.value)
      setValue([event.target.value, max])
    }
  }
  
  const checkCorrectMaxMin = () => {
    if (min > max) {
      setMin((+max - 50))
      setValue([(+max - 50), max])
    }else if (max > 2000){
      setMax(2000)
      setValue([min, 2000])
    }else if (min < 0){
      setMin(0)
      setValue([0, max])
    }
  }

  const fetchRestaurant = () => {
    contextRestaurant.getRestaurants("status", toggleSwitch.available ? RestaurantStatus.RESTAURANT_OPEN : RestaurantStatus.RESTAURANT_CLOSED )
  }

  return (
    <ThemeProvider theme={theme}>
      <FilterBar open={open} callBackToParent={callBackFormFilter} handleCloseFromParent={fetchRestaurant}>
        <div className="flex flex-col px-2">
          <div className="flex flex-row">
            <div className="w-1/3 pt-2 text-right"><RegularText>ร้านเปิด</RegularText></div>
            <div className="w-1/3 flex justify-center">
              <Switch
                checked={toggleSwitch.available}
                onChange={handleChangeSwitch}
                name="available"
              />
            </div>
            <div className="w-1/3 pt-2 text-left"><RegularText>ปิด</RegularText></div>
          </div>
          <div className="flex flex-col mt-2">
            <div className="text-center">
              <RegularText bold>เรตติ้ง</RegularText>
            </div>
            <div className="flex justify-center">
              <Rating name="size-small" defaultValue={1} max={5} />
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <div className="text-center">
              <RegularText bold>ช่วงราคา</RegularText>
            </div>
            <div className="px-3">
              <Slider
                min={0}
                max={2000}
                value={value}
                onChange={handleChangeValue}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </div>
            <div className="flex justify-around space-x-3">
              <TextField 
                id="min" 
                size="small" 
                value={min} 
                label="ต่ำสุด" 
                variant="outlined" 
                onChange={(e) => changeMaxMinValue(e, "min")} 
                onBlur={checkCorrectMaxMin}
                inputProps={{ pattern: "[0-9]*" }}
                />
              <div className="text-center flex items-center">
                <RegularText>-</RegularText>
              </div>
              <TextField 
                id="max" 
                size="small" 
                value={max} 
                label="สูงสุด" 
                variant="outlined" 
                onChange={(e) => changeMaxMinValue(e, "max")} 
                onBlur={checkCorrectMaxMin}
                inputProps={{ pattern: "[0-9]*" }}
                />
            </div>
          </div>
          <div className="flex flex-row justify-around mt-4">
            <div className="pt-2 text-right">
              <RegularText>
                {
                  toggleSwitch.promotion ? "มีโปรโมชั่น" : "ไม่มีโปรโมชั่น"
                }
              </RegularText>
            </div>
            <div className="">
              <Switch
                checked={toggleSwitch.promotion}
                onChange={handleChangeSwitch}
                name="promotion"
              />
            </div>
          </div>
          
        </div>
      </FilterBar>
    </ThemeProvider>
  )
}

export default FilterRestaurant

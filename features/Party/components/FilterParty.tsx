import React, { useState, useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs'
import _ from 'lodash'

import FilterBar from '../../../core/components/FilterBar'
import { RegularText, NormalText } from '../../../core/config/textStyle';
import { partyContext } from '../contexts/party_context'

interface Props {
  open: boolean
  callBackFormFilter: (value) => void
}

// interface SelectedTag {
//   value: string,
//   label: string,
//   selected: boolean
// }

let now = dayjs()
let dateNow = now.format("YYYY-MM-DDTHH:mm")
let dateAddHour = now.add(2, 'h').format("YYYY-MM-DDTHH:mm")

const TagButton = styled.div`
  background-color: #FFFFFF ;
  border-right: ${props => props.selected ? '10px solid #FFA753' : 'none'};
  padding: .5em 0;
  margin: 0 .5em;
`

const useStyles = makeStyles({
  root: {
    borderRadius: 25,
    borderColor: "#F8CE28",
    backgroundColor: "#FFFFFF",
    height: '55px',
    [`& fieldset`]: {
      height: '60px',
      borderRadius: 25,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28 !important",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28"
    },
  },
  resize: {
    textAlign: 'center',
    height: '60px',
    fontSize: '16px'
  },
});

const FilterParty = (props: Props) => {
  const classes = useStyles();
  const contextParty = useContext(partyContext)
  const { open, callBackFormFilter } = props
  const [startScheduleTime, setStartScheduleTime] = useState<string>(dateNow)
  const [endScheduleTime, setEndScheduleTime] = useState<string>(dateAddHour)
  const [clickSeeTagMore, setClickSeeTagMore] = useState<boolean>(false)
  const [countTag, setCountTag] = useState<number>(4)
  const [testTag, setTestTag] = useState([])

  useEffect(() => {
      setTestTag(contextParty.allTag)
    // }
  })
  
  const handleChangeValue = (event: any) => {
    if (event.target.name === "start_schedule_time") {
      setStartScheduleTime(event.target.value)
    }
    if (event.target.name === "end_schedule_time") {
      setEndScheduleTime(event.target.value)
    }
  };

  const checkDate = () => {
    if (!(dayjs(startScheduleTime).isBefore(endScheduleTime))) {
      let newEndDate = dayjs(startScheduleTime).add(2, 'h').format("YYYY-MM-DDTHH:mm")
      setEndScheduleTime(newEndDate)
    }
  }

  const handleClickTag = (selected) => {
    // contextParty.setSelectedTag(selected)
    _.map(contextParty.allTag, data => {
      if (data.value === selected.value){
        data.selected = !data.selected
      }
    })
    setTestTag(contextParty.allTag)
  }

  const seeTagMore = () => {
    if (!clickSeeTagMore){
      setCountTag(contextParty.allTag.length)
    }else{
      setCountTag(4)
    }
    setClickSeeTagMore(!clickSeeTagMore)
  }

  return (
    <FilterBar open={open} callBackToParent={callBackFormFilter} >
      <div className="overscroll-auto mb-20">
        <div className="text-center mb-2">
          <RegularText> แท็กปาร์ตี้ที่ต้องการ </RegularText>
        </div>
        <div className="flex flex-wrap justify-center px-3 mb-3">
          {
            _.map(contextParty.allTag, (data, index) => (
              index < countTag ?
              <div className="w-1/2 mb-2 px-0.5 py-0.5">
                {data.selected+""}
                <TagButton 
                  selected={data.selected}
                  onClick={() => handleClickTag(data)}
                  className="text-center rounded-5"
                  >
                  {data.label}
                </TagButton>
              </div>
              : <></>
              ))
          }
          <Button variant="contained" color="primary" onClick={() => seeTagMore()}>
            {clickSeeTagMore ? "แสดงน้อยลง ^ " : "ดูแท็กเพิ่มเติม V" }
          </Button>
        </div>
        <div className="flex flex-col space-y-2 px-3">
          <div className="text-center">
            <RegularText> ช่วงเวลาที่จะไป </RegularText>
          </div>
          <TextField
            id="start_schedule_time"
            name="start_schedule_time"
            type="datetime-local"
            variant="outlined"
            size="small"
            margin="none"
            className={classes.root}
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            value={startScheduleTime}
            onChange={handleChangeValue}
            onBlur={checkDate}
            inputProps={{
              min: dateNow
            }}
          />
          <div className="text-center">
            <RegularText> ถึง </RegularText>
          </div>
          <TextField
            id="end_schedule_time"
            name="end_schedule_time"
            type="datetime-local"
            variant="outlined"
            size="small"
            margin="none"
            className={classes.root}
            value={endScheduleTime}
            onChange={handleChangeValue}
            onBlur={checkDate}
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            inputProps={{
              min: dateNow
            }}
          />
        </div>
      </div>
    </FilterBar>
  )
}

export default FilterParty

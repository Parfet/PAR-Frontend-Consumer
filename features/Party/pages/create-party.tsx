import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { useFormik } from 'formik';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
  TextField, 
  MenuItem, 
  Button, 
  } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


import { SubHeader } from '../../../core/config/textStyle'
import InputField from '../components/InputField'
import { aryMaxMember, aryPartyType, aryPromotion, restaurantMock, interestTag} from '../../../core/config/mockData'

let now = dayjs()
let dateNow = now.format("YYYY-MM-DDTHH:mm")
let dateAddHour = now.add(2, 'h').format("YYYY-MM-DDTHH:mm")
const animatedComponents = makeAnimated();

interface FormValue {
  partyName: string
  partyTopic: string
  tags: string[]
  restaurant: string
  promotion: string
  dateTime: string
  partyType: string
  maxMember: number
  passCode?: string
}

const useStyles = makeStyles({
  root: {
    borderRadius: 25,
    borderColor: "#F8CE28",
    [`& fieldset`]: {
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
});

const CreateButton = withStyles(() => ({
  root: {
    borderRadius: 25,
    backgroundColor: "#F8CE28",
    '&:hover': {
      backgroundColor: "#F8CE28",
    },
  },
}))(Button)

const customStyles = {
  control: (styles, { isFocused, isSelected }) => ({ ...styles,
    borderRadius: 25,
    backgroundColor: "none",
    boxShadow: "none",
    ":hover": {
      ...styles[":hover"],
      borderColor: "#F8CE28",
    },
    ":active": {
      ...styles[":active"],
      borderColor: "#F8CE28",
    }
  }),
}

const CreateParty = () => {
  const classes = useStyles();
  const [maxMember, setMaxMember] = useState(aryMaxMember[0]);
  const [partyType, setPartyType] = useState(aryPartyType[0]);
  const [promotion, setPromotion] = useState(aryPromotion[0]);
  const [date, setDate] = useState(dateAddHour);
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [value, setValue] = useState<string | null>(restaurantMock[0]);
  const [inputValue, setInputValue] = useState('');

  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const changePromotion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromotion(event.target.value);
  };

  const changePartyType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyType(event.target.value);
  };

  const changeMaxMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxMember(+event.target.value);
  };

  return (
    <form className="flex flex-col justify-center w-screen my-14 px-10">
      <InputField label="ชื่อปาร์ตี้">
        <TextField id="partyName" variant="outlined" size="small" className={classes.root} required />
      </InputField>
      <InputField label="หัวข้อที่สนใจคุยในปาร์ตี้">
        <TextField id="topic" variant="outlined" size="small" className={classes.root} required />
      </InputField>
      <InputField label="Tag ที่สนใจ">
        <Select
          styles={customStyles}
          closeMenuOnSelect={false}
          components={animatedComponents}
          placeholder="เลือกTag ที่เกี่ยวข้อง"
          isMulti
          options={interestTag}
          className="rounded-lg"
        />
      </InputField>
      <InputField label="ร้านบุฟเฟต์">
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={restaurantMock}
          className={classes.root} 
          size="small"
          renderInput={(params) => <TextField {...params} variant="outlined" required />}
        />
      </InputField>
      <InputField label="โปรโมชั่น">
        <TextField
          id="Promotion"
          variant="outlined"
          size="small"
          className={classes.root}
          select
          value={promotion}
          onChange={changePromotion}
        >
          {
            aryPromotion.map((data) => (
              <MenuItem key={data} value={data}>
                {data}
              </MenuItem>
            ))
          }
        </TextField>
      </InputField>
      <InputField label="วันและเวลาที่จะไป">
        <TextField
          id="datetime"
          type="datetime-local"
          variant="outlined"
          defaultValue={dateAddHour}
          size="small" 
          className={classes.root}
          onChange={changeDate}
          inputProps={{
            min: dateNow
          }}
        />
      </InputField>
      <div className="flex  space-x-2">
        <InputField label="ประเภทของปาร์ตี้" className="w-2/3">
          <TextField
            id="standard-select-currency"
            variant="outlined"
            size="small" 
            className={classes.root}
            select
            value={partyType}
            onChange={changePartyType}
          >
            {
              aryPartyType.map((data) => (
                <MenuItem key={data} value={data}>
                  {data}
                </MenuItem>
              ))
            }
          </TextField>
        </InputField>
        <InputField label="จำนวนคนสูงสุด" className="w-1/3">
          <TextField
            id="standard-select-currency"
            variant="outlined"
            size="small" 
            className={classes.root}
            select
            value={maxMember}
            onChange={changeMaxMember}
          >
            {
              aryMaxMember.map((data) => (
                <MenuItem key={data} value={data}>
                  {data}
                </MenuItem>
              ))
            }
          </TextField>
        </InputField>
      </div>
      {
        partyType === aryPartyType[1] ?
          <InputField label="รหัสผ่าน">
            <TextField 
              id="Tag" 
              variant="outlined" 
              size="small" 
              type="text"
              className={classes.root} 
              inputProps={{ maxlength: "6", pattern: "[0-9]*" }}
              required
            />
          </InputField>
        :<></>
      }
      <div className="flex justify-center mt-5">
        <CreateButton variant="contained" type="submit">
          <SubHeader className="text-white">สร้างปาร์ตี้</SubHeader>
        </CreateButton>
      </div>
    </form>
  )
}

export default CreateParty

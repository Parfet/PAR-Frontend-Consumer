import React, { useState } from 'react'
import dayjs from 'dayjs'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Button } from '@material-ui/core';
import { DateTimePicker } from "@material-ui/pickers";

import { SubHeader } from '../../../core/config/textStyle'
import InputField from '../components/InputField'

let now = dayjs()
let dateNow = now.format("DD/MMM/YYYYTHH:mm ")
let dateAddHour = now.add(2, 'h').format("DD/MMM/YYYYTHH:mm ")

const useStyles = makeStyles({
  root: {
    [`& fieldset`]: {
      borderRadius: 25,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28"
    },
  }
});

const CreateButton = withStyles(() => ({
  root: {
    borderRadius: 25,
    backgroundColor: "#F8CE28",
    '&:hover': {
      backgroundColor: "#F8CE28",
    },
  },
}))(Button);

const aryMaxMember = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
const aryPartyType = [ "สาธารณะ", "ส่วนตัว" ]

const CreateParty = () => {
  const classes = useStyles();
  const [maxMember, setMaxMember] = useState(aryMaxMember[0]);
  const [partyType, setPartyType] = useState(aryPartyType[0]);
  const [selectedDate, handleDateChange] = useState(dateNow);

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
        <TextField id="Tag" variant="outlined" size="small" className={classes.root} required />
      </InputField>
      <InputField label="ร้านบุฟเฟต์">
        <TextField id="restaurant" variant="outlined" size="small" className={classes.root} required />
      </InputField>
      <InputField label="วันและเวลาที่จะไป">
        {/* <DateTimePicker
          label="DateTimePicker"
          inputVariant="outlined"
          value={selectedDate}
          onChange={handleDateChange}
        /> */}
        <TextField
          id="datetime"
          type="datetime-local"
          variant="outlined"
          defaultValue={dateAddHour}
          InputLabelProps={{
            shrink: true,
          }}
          size="small" 
          className={classes.root}
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
              type='number' 
              className={classes.root} 
              inputProps={{ pattern: "[0-9]*" }}
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

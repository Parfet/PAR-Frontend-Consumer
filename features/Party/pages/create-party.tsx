import React, { useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { useFormik } from 'formik';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Select, { components } from 'react-select'
import makeAnimated from 'react-select/animated';

import { aryPromotion, restaurantMock, interestTag } from '../../../core/config/mockData'
import { partyType, partyTypeThai } from '../../../core/config/constant'
import { SubHeader, NormalText } from '../../../core/config/textStyle'
import { apiParty } from '../../../core/service/apiParty'
import InputField from '../components/InputField'
import { ValidationFormSchema } from '../services/validationSchema'

let now = dayjs()
let dateNow = now.format("YYYY-MM-DDTHH:mm")
let dateAddHour = now.add(2, 'h').format("YYYY-MM-DDTHH:mm")

const animatedComponents = makeAnimated();

const aryMaxMember = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const aryPartyType = [partyTypeThai.PUBLIC, partyTypeThai.PRIVATE]

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

const customStyles = (checkTags) => ({
  control: (styles) => ({ ...styles,
    borderRadius: 25,
    backgroundColor: "none",
    boxShadow: "none",
    borderColor: checkTags ? 'red' : '#C0C0C0',
    ":hover": {
      ...styles[":hover"],
      borderColor: "#F8CE28",
    },
    ":active": {
      ...styles[":active"],
      borderColor: "#F8CE28",
    }
  }),
})

const DropdownIndicator = ({...props }) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDropDownIcon style={{ color: "#737373"}} />
    </components.DropdownIndicator>
  );
};

const CreateParty = () => {
  const router = useRouter()
  const classes = useStyles();
  const [restaurant, setRestaurant] = useState<string | null>(restaurantMock[0]);
  const [inputRestaurant, setInputRestaurant] = useState('');
  const [checkTags, setCheckTags] = useState(false);

  const formik = useFormik({
    initialValues: {
      partyName: '',
      partyTopic: '',
      tags: [],
      restaurant: restaurantMock[0],
      promotion: aryPromotion[0],
      datetime: dateAddHour,
      partyType: partyTypeThai.PUBLIC,
      maxMember: aryMaxMember[0],
      password: ''
    },
    validationSchema: ValidationFormSchema,
    onSubmit: (values) => {
      if (formik.values.tags.length === 0){
        setCheckTags(true)
      }else{
        setCheckTags(false)
      }

      if (values.partyType === partyTypeThai.PRIVATE){
        values.partyType = partyType.PRIVATE
      } else {
        values.partyType = partyType.PUBLIC
      }

      if (!checkTags && formik.values.tags.length != 0){
        let tagsValue = []
        formik.values.tags.map((data) => {
          tagsValue.push(data.value)
        })
        values.tags = tagsValue
        apiParty.createParty(values)
        router.push('/party/'+values.partyName)
      }
    },
  });

  return (
    <form className="flex flex-col justify-center w-screen my-14 px-10" onSubmit={formik.handleSubmit}>
      <InputField label="ชื่อปาร์ตี้">
        <TextField 
          id="partyName" 
          name="partyName" 
          variant="outlined" 
          size="small" 
          className={classes.root} 
          value={formik.values.partyName} 
          onChange={formik.handleChange}
          error={formik.touched.partyName && Boolean(formik.errors.partyName)}
          helperText={formik.touched.partyName && formik.errors.partyName}
          />
      </InputField>
      <InputField label="หัวข้อที่สนใจคุยในปาร์ตี้">
        <TextField 
          id="partyTopic"
          name="partyTopic"
          variant="outlined" 
          size="small" 
          className={classes.root} 
          value={formik.values.partyTopic}
          onChange={formik.handleChange}
          error={formik.touched.partyTopic && Boolean(formik.errors.partyTopic)}
          helperText={formik.touched.partyTopic && formik.errors.partyTopic}
          />
      </InputField>
      <InputField label="Tag ที่สนใจ">
        <>
          <Select
            styles={customStyles(checkTags)}
            closeMenuOnSelect={false}
            inputId="tags"
            placeholder="เลือกTag ที่เกี่ยวข้อง"
            className="rounded-lg"
            isMulti
            components={{ animatedComponents, DropdownIndicator }}
            options={interestTag}
            onChange={(e) => { formik.setFieldValue('tags', e)}}
            onBlur={() => { formik.values.tags.length === 0 ? setCheckTags(true) : setCheckTags(false)}}
            error={formik.touched.tags && Boolean(formik.errors.tags)}
            helperText={formik.touched.tags && formik.errors.tags}
          />
          {
            checkTags ? 
              <NormalText className="ml-3 mt-1" style={{ color: 'red' }}>จำเป็นต้องกรอกแท็กที่เกี่ยวข้อง</NormalText> 
              : <></>
          }
        </>
      </InputField>
      <InputField label="ร้านบุฟเฟต์">
        <Autocomplete
          value={restaurant}
          onChange={(event: any, newRestaurant: string | null) => {
              setRestaurant(newRestaurant)
              formik.setFieldValue('restaurant', newRestaurant)
            }
          }
          inputValue={inputRestaurant}
          onInputChange={(event, newInputRestaurant) => {
            setInputRestaurant(newInputRestaurant);
          }}
          id="controllable-states-demo"
          options={restaurantMock}
          className={classes.root}
          size="small"
          renderInput={(params) => 
            <TextField 
              {...params} 
              variant="outlined" 
              id="restaurant"
              name="restaurant"
              value={formik.values.restaurant}
              error={formik.touched.restaurant && Boolean(formik.errors.restaurant)}
              helperText={formik.touched.restaurant && formik.errors.restaurant}
              />
          }
        />
      </InputField>
      <InputField label="โปรโมชั่น">
        <TextField
          id="promotion"
          name="promotion"
          variant="outlined"
          size="small"
          className={classes.root}
          select
          value={formik.values.promotion}
          onChange={formik.handleChange}
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
          name="datetime"
          type="datetime-local"
          variant="outlined"
          size="small" 
          className={classes.root}
          value={formik.values.datetime}
          onChange={formik.handleChange}
          inputProps={{
            min: dateNow
          }}
        />
      </InputField>
      <div className="flex  space-x-2">
        <InputField label="ประเภทของปาร์ตี้" className="w-2/3">
          <TextField
            id="partyType"
            name="partyType"
            variant="outlined"
            size="small" 
            className={classes.root}
            select
            value={formik.values.partyType}
            onChange={formik.handleChange}
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
            id="maxMember"
            name="maxMember"
            variant="outlined"
            size="small" 
            className={classes.root}
            select
            value={formik.values.maxMember}
            onChange={formik.handleChange}
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
        formik.values.partyType === partyType.PRIVATE ?
          <InputField label="รหัสผ่าน">
            <TextField 
              id="password" 
              name="password" 
              variant="outlined" 
              size="small" 
              type="text"
              className={classes.root} 
              inputProps={{ minLength: "6", maxLength: "6", pattern: "[0-9]*" }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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

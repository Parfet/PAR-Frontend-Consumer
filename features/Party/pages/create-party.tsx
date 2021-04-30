import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { useFormik } from 'formik';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Select, { components } from 'react-select'
import makeAnimated from 'react-select/animated';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import { aryPromotion, restaurantMock, interestTag } from '../../../core/config/mockData'
import { PartyType } from '../../../core/constant/enum'
import { PartyTypeThai } from '../../../core/constant/constant'
import { authContext } from '../../../core/context/auth_context'
import { SubHeader, NormalText } from '../../../core/config/textStyle'
import { restaurantContext } from '../../Restaurant/contexts/restaurant_context'
import apiParty from '../services/apiParty'
import InputField from '../components/InputField'
import { ValidationFormSchema } from '../services/validationSchema'
import { ContactSupportOutlined } from '@material-ui/icons';

let now = dayjs()
let dateNow = now.format("YYYY-MM-DDTHH:mm")
let dateAddHour = now.add(2, 'h').format("YYYY-MM-DDTHH:mm")

const animatedComponents = makeAnimated();

const aryMaxMember = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const aryPartyType = [PartyTypeThai.PUBLIC, PartyTypeThai.PRIVATE]

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
  const [checkTags, setCheckTags] = useState(false);
  const contextRestaurant = useContext(restaurantContext)
  const contextUser = useContext(authContext)

  useEffect(() => {
    contextUser.getOneUser()
  }, [contextUser])

  const handleCreateParty = async (values) => {
    const res = await apiParty.createParty(contextRestaurant.currentRestaurant.restaurant_id, values)
    if (res.status === StatusCodes.OK){
      router.push('/party/' + values.party_name)
    }
  }

  const formik = useFormik({
    initialValues: {
      party_name: '',
      head_party: contextUser.userId,
      interested_topic: '',
      interested_tag: [],
      promotion: aryPromotion[0],
      schedule_time: dateAddHour,
      party_type: PartyTypeThai.PUBLIC,
      max_member: aryMaxMember[0],
      passcode: ''
    },
    validationSchema: ValidationFormSchema,
    onSubmit: (values) => {
      console.log("🚀 ~ file: create-party.tsx ~ line 119 ~ CreateParty ~ formik.values.interested_tag", formik.values.interested_tag)
      if (formik.values.interested_tag.length === 0){
        setCheckTags(true)
      }else{
        setCheckTags(false)
      }
      
      if (values.party_type === PartyTypeThai.PRIVATE){
        values.party_type = PartyType.PRIVATE
      } else {
        values.party_type = PartyType.PUBLIC
      }
      
      if (!checkTags && formik.values.interested_tag.length != 0){
        console.log(5)
        let tagsValue = []
        formik.values.interested_tag.map((data) => {
          tagsValue.push(data.value)
        })
        values.interested_tag = tagsValue
        handleCreateParty(values)
      }
    },
  });

  return (
    <form className="flex flex-col justify-center w-screen my-14 px-10" onSubmit={formik.handleSubmit}>
      <InputField label="ชื่อปาร์ตี้">
        <TextField 
          id="party_name"
          name="party_name"
          variant="outlined" 
          size="small" 
          className={classes.root} 
          value={formik.values.party_name} 
          onChange={formik.handleChange}
          error={formik.touched.party_name && Boolean(formik.errors.party_name)}
          helperText={formik.touched.party_name && formik.errors.party_name}
          />
      </InputField>
      <InputField label="หัวข้อที่สนใจคุยในปาร์ตี้">
        <TextField 
          id="interested_topic"
          name="interested_topic"
          variant="outlined" 
          size="small" 
          className={classes.root} 
          value={formik.values.interested_topic}
          onChange={formik.handleChange}
          error={formik.touched.interested_topic && Boolean(formik.errors.interested_topic)}
          helperText={formik.touched.interested_topic && formik.errors.interested_topic}
          />
      </InputField>
      <InputField label="Tag ที่สนใจ">
        <>
          <Select
            styles={customStyles(checkTags)}
            closeMenuOnSelect={false}
            inputId="interested_tag"
            placeholder="เลือกTag ที่เกี่ยวข้อง"
            className="rounded-lg"
            isMulti
            components={{ animatedComponents, DropdownIndicator }}
            options={interestTag}
            onChange={(e) => { formik.setFieldValue('interested_tag', e)}}
            onBlur={() => { formik.values.interested_tag.length === 0 ? setCheckTags(true) : setCheckTags(false)}}
            error={formik.touched.interested_tag && Boolean(formik.errors.interested_tag)}
            helperText={formik.touched.interested_tag && formik.errors.interested_tag}
          />
          {
            checkTags ? 
              <NormalText className="ml-3 mt-1" style={{ color: 'red' }}>จำเป็นต้องกรอกแท็กที่เกี่ยวข้อง</NormalText> 
              : <></>
          }
        </>
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
          id="schedule_time"
          name="schedule_time"
          type="datetime-local"
          variant="outlined"
          size="small" 
          className={classes.root}
          value={formik.values.schedule_time}
          onChange={formik.handleChange}
          inputProps={{
            min: dateNow
          }}
        />
      </InputField>
      <div className="flex  space-x-2">
        <InputField label="ประเภทของปาร์ตี้" className="w-2/3">
          <TextField
            id="party_type"
            name="party_type"
            variant="outlined"
            size="small" 
            className={classes.root}
            select
            value={formik.values.party_type}
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
            id="max_member"
            name="max_member"
            variant="outlined"
            size="small" 
            className={classes.root}
            select
            value={formik.values.max_member}
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
        formik.values.party_type === PartyTypeThai.PRIVATE ?
          <InputField label="รหัสผ่าน">
            <TextField 
              id="passcode" 
              name="passcode" 
              variant="outlined" 
              size="small" 
              type="text"
              className={classes.root} 
              inputProps={{ minLength: "6", maxLength: "6", pattern: "[0-9]*" }}
              value={formik.values.passcode}
              onChange={formik.handleChange}
              error={formik.touched.passcode && Boolean(formik.errors.passcode)}
              helperText={formik.touched.passcode && formik.errors.passcode}
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

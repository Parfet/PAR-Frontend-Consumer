import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { useFormik } from 'formik';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Button } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Select, { components } from 'react-select'
import makeAnimated from 'react-select/animated';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import { interestTag } from '../../../core/config/mockData'
import { PartyType } from '../../../core/constant/enum'
import { Party } from '../../../core/constant/type'
import { PartyTypeThai } from '../../../core/constant/constant'
import { SubHeader, NormalText } from '../../../core/config/textStyle'
import { useRestaurant } from '../../Restaurant/contexts/restaurant_context'
import apiParty from '../services/apiParty'
import { useParty } from '../contexts/party_context'
import InputField from '../../../core/components/InputField'
import { ValidationFormSchema } from '../services/validationSchema'

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
interface Prop {
  edit?: boolean
}

const CreateParty = (prop :Prop) => {
  const { edit } = prop
  const router = useRouter()
  const classes = useStyles();
  const [checkTags, setCheckTags] = useState(false);
  const [partyName, setPartyName] = useState('');
  const [interestedTopic, setInterestedTopic] = useState('');
  const [interestTags, setInterestTags] = useState([]);
  const [scheduleTime, setScheduleTime] = useState(dateAddHour);
  const [partyType, setPartyType] = useState(PartyTypeThai.PUBLIC);
  const [maxMember, setMaxMember] = useState(aryMaxMember[0]);
  const [passcode, setPasscode] = useState('');
  const [openChat, setOpenChat] = useState('');
  const restaurantContext = useRestaurant()
  const partyContext = useParty()

  useEffect(() => {
    if(!restaurantContext.currentRestaurant && !edit){
      router.push('/restaurant')
    }
    (async () => {
      await partyContext.getAllTag()
      if (edit){
        await setData(partyContext.currentParty)
      }
    })()
  }, [])

  const handleEditParty = async (values) => {
    try {
      const res = await apiParty.updateParty(values, partyContext.currentParty.party_id)
      if (res.status === StatusCodes.OK) {
        router.push('/party/' + partyContext.currentParty.party_id)
      }
    } catch (error) {
      if (error.response?.status) {
        router.push('/party')
      }
    }
  }

  const handleCreateParty = async (values) => {
    const res = await apiParty.createParty(restaurantContext.currentRestaurant ,values)
    if (res.status === StatusCodes.OK){
      router.push('/party/' + res.data.party_id)
    }
  }

  const handleChangeTag = async (e) => {
    setCheckTags(e.length == 0)
    formik.setFieldValue('interest_tags', e)
  }

  const setData = (value: Party) => {
  console.log("🚀 ~ file: create-party.tsx ~ line 132 ~ setData ~ value", value)
    setPartyName(value.party_name)
    setInterestedTopic(value.party_name)
    setInterestTags(value.interest_tags)
    setScheduleTime(dayjs(value.schedule_time).format("YYYY-MM-DDTHH:mm"))
    setPartyType(value.party_type === PartyType.PRIVATE ? PartyTypeThai.PRIVATE : PartyTypeThai.PUBLIC)
    setMaxMember(value.max_member)
    setPasscode(value.passcode)
    setOpenChat(value.open_chat_link)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      party_name: partyName,
      interested_topic: interestedTopic,
      interest_tags: interestTags,
      schedule_time: scheduleTime,
      party_type: partyType,
      max_member: maxMember,
      passcode: passcode,
      open_chat_link: openChat,
    },
    validationSchema: ValidationFormSchema,
    onSubmit: (values) => {
      if (values.party_type === PartyTypeThai.PRIVATE){
        values.party_type = PartyType.PRIVATE
      } else {
        values.party_type = PartyType.PUBLIC
      }
      
      if (!checkTags && formik.values.interest_tags.length != 0){
        let tagsValue = []
        formik.values.interest_tags.map((data) => {
          tagsValue.push(data.value)
        })
        values.interest_tags = tagsValue
        if (edit){
          handleEditParty(values)
        }else {
          handleCreateParty(values)
        }
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
            value={formik.values.interest_tags}
            styles={customStyles(checkTags || (formik.touched.interest_tags && !!formik.errors.interest_tags))}
            closeMenuOnSelect={false}
            inputId="interest_tags"
            placeholder="เลือกTag ที่เกี่ยวข้อง"
            className="rounded-lg"
            isMulti
            options={partyContext.allTag}
            components={{ animatedComponents, DropdownIndicator }}
            onChange={(e) => handleChangeTag(e)}
            error={formik.touched.interest_tags && Boolean(formik.errors.interest_tags)}
            helperText={formik.touched.interest_tags && formik.errors.interest_tags}
          />
          {
            checkTags || (formik.touched.interest_tags && !!formik.errors.interest_tags) ?
              <NormalText className="ml-3 mt-1" style={{ color: 'red' }}>จำเป็นต้องกรอกแท็กที่เกี่ยวข้อง</NormalText> 
              : <></>
          }
        </>
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
            min: edit ? '' : dateNow
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
      {
        edit ?
          <InputField label="Line OpenChat">
            <TextField
              id="open_chat_link"
              name="open_chat_link"
              variant="outlined"
              size="small"
              className={classes.root}
              value={formik.values.open_chat_link}
              onChange={formik.handleChange}
              error={formik.touched.open_chat_link && Boolean(formik.errors.open_chat_link)}
              helperText={formik.touched.open_chat_link && formik.errors.open_chat_link}
            />
          </InputField>
          : <></>
      }
      <div className="flex justify-center mt-5">
        <CreateButton variant="contained" type="submit">
          <SubHeader className="text-white">
            {
              edit ? 'ยืนยันการแก้ไข'
              : 'สร้างปาร์ตี้'
            }
          </SubHeader>
        </CreateButton>
      </div>
    </form>
  )
}

export default CreateParty

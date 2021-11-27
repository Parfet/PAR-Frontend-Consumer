import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import Cookies from 'universal-cookie'
import { StatusCodes } from 'http-status-codes';
import Select,{components} from 'react-select'
import makeAnimated from 'react-select/animated';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { useUser } from '../../../core/context/auth_context';
import InputField from '../../../core/components/InputField';
import { SubHeader,NormalText } from '../../../core/config/textStyle';
import { Errors } from '../../../core/constant/enum';
import { ValidationFormSchema } from '../../Register/services/validationSchema';
import { interestTag } from '../../../core/config/mockData';

const cookies = new Cookies()

const animatedComponents = makeAnimated();

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
    backgroundColor: "#F8CE28",
    '&:hover': {
      backgroundColor: "#F8CE28",
    },
  },
}))(Button)

const UserPage = () => {
    const router = useRouter()
    const userContext = useUser();
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [provider, setProvider] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [checkTags, setCheckTags] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          provider: provider,
          username: '',
          displayName: '',
          email: email,
          firstName: firstName,
          lastName: lastName,
          photoUrl: photoUrl,
          interest_tags: interestTag
        },
        validationSchema: ValidationFormSchema,
        onSubmit: async (values) => {
          console.log("🚀 ~ file: index.tsx ~ line 105 ~ Register ~ userContext.userData", userContext.userData)
          cookies.set('access_token', userContext.userData.token, { path: '/', maxAge: 3600 })
          cookies.set('refresh_token', userContext.userData.refreshToken, { path: '/', maxAge: 3600 })
          const response = await userContext.register(values)
          console.log("🚀 ~ file: index.tsx ~ line 107 ~ Register ~ response", response)
          if (response.message == Errors.USERNAME_ALREADY) {
            formik.touched.username = true
            formik.errors.username = "มีชื่อผู้ใช้งานนี้แล้ว"
          } else if(response.message == Errors.DISPLAY_ALREADY){
            formik.touched.displayName = true
            formik.errors.displayName = "มีชื่อที่ต้องการแสดงนี้แล้ว"
          } else if (response.status == StatusCodes.NO_CONTENT){
            router.push('/')
          } else {
            router.push('/signin')
          }
        },
      });

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

    const handleChangeTag = async (e) => {
      setCheckTags(e.length == 0)
      formik.setFieldValue('interest_tags', e)
    }
      
    return (
        <form className="flex flex-col justify-center w-screen my-14 px-10" onSubmit={formik.handleSubmit}>
          <div className="flex justify-center">
            <Image
              alt={firstName + " Photo"}
              src={photoUrl || "/images/logo_parfet_192.png"}
              width={"200px"}
              height={"200px"}
              className="rounded-50"
            />
          </div>
          <InputField label="ชื่อผู้ใช้งาน">
            <TextField
              disabled
              id="username"
              name="username"
              variant="outlined"
              size="small"
              className={classes.root}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              >
            </TextField>
          </InputField>
          สามารถมีตัวอักษรได้ดังนี้ A-Z, a-z, 0-9
          <InputField label="ชื่อที่ต้องการแสดง">
            <TextField
              id="displayName"
              name="displayName"
              variant="outlined"
              size="small"
              className={classes.root}
              value={formik.values.displayName}
              onChange={formik.handleChange}
              error={formik.touched.displayName && Boolean(formik.errors.displayName)}
              helperText={formik.touched.displayName && formik.errors.displayName}
            >
            </TextField>
          </InputField>
          <InputField label="อีเมลล์">
            <TextField
              disabled
              id="email"
              name="email"
              variant="outlined"
              size="small"
              className={classes.root}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            >
            </TextField>
          </InputField>
          <InputField label="ชื่อ">
            <TextField
              disabled
              id="firstName"
              name="firstName"
              variant="outlined"
              size="small"
              className={classes.root}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            >
            </TextField>
          </InputField>
          <InputField label="นามสกุล">
            <TextField
              disabled
              id="lastName"
              name="lastName"
              variant="outlined"
              size="small"
              className={classes.root}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            >
            </TextField>
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
          <div className="flex justify-center mt-5" >
            <div>
            <CreateButton variant="contained" type="submit">
              <SubHeader className="text-white">
                ยืนยัน
              </SubHeader>
            </CreateButton>
            </div>
          </div>
        </form>
      )

}

export default UserPage
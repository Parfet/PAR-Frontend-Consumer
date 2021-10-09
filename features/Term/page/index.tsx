import React, { useState } from 'react'
import router from 'next/router';
import { FormControlLabel, Button } from '@material-ui/core/';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import { termInfo } from '../service/term'

const Bullet = () => <span className="pl-3 pr-1 text-xl">•</span>

const index = () => {
  const [disable, setDisable] = useState(true)
  const [agree, setAgree] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(event.target.checked)
    setDisable(!event.target.checked)
  };

  const YellowCheckbox = withStyles({
    root: {
      color: "#FFD700",
      '&$checked': {
        color: "#FFD700",
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

  const YellowButton = withStyles(() => ({
    root: {
      borderRadius: 25,
      backgroundColor: "#F8CE28",
      color: "#FFF",
      '&:hover': {
        backgroundColor: "#F8CE28",
        color: "#FFF",
      },
    },
  }))(Button)

  return (
    <div className="w-screen mt-14 px-10 flex flex-1 flex-col justify-between">
      <div>
        <div className="mt-5 h-96 overflow-scroll">
          {
            termInfo.map( (info, index) => (
              <div className={`${index == 0 ? '' : 'mt-2'}`} >
                <span>{info.header}</span><br  />
                <span className="break-words pl-5" >{info.body.info}</span><br  />
                {
                  info.body.bullet ? info.body.bullet.map( (bullet) => (
                    <>
                      <span> <Bullet />{bullet.info}</span><br />
                      {
                        bullet.components ? 
                          <ul className="list-decimal list-inside pl-8">
                            {
                              bullet.components.map( (compo) => (
                                <li>{compo}</li>
                              ))
                            }
                          </ul>
                        : <></>
                      }
                    </>
                    ))
                  : <></>
                }
              </div>
            ))
          }
        </div>
        <FormControlLabel control={<YellowCheckbox name="agree" checked={agree} onChange={handleChange} />} label="ยอมรับเงื่อนในการใช้บริการ" />
      </div>
      <div className="flex justify-center mt-10">
        <YellowButton disabled={disable} className="w-full" onClick={() => router.push('/register')}>ต่อไป</YellowButton>
      </div>
    </div>
  )
}

export default index

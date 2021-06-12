import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useObserver } from 'mobx-react-lite'
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import {
  Paper,
  InputBase,
  IconButton,
  AppBar,
  Tabs,
  Tab,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import StarIcon from '@material-ui/icons/Star'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PhoneIcon from '@material-ui/icons/Phone';
import _ from "lodash"

import NoContent from '../../../core/components/NoContent'
import { SubHeader, RegularText } from '../../../core/config/textStyle'
import { restaurantContext } from '../contexts/restaurant_context'
import TabPanel from '../components/TabPanel'

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
  }),
);

const RestaurantInfo = () => {
  const classes = useStyles();
  const theme = useTheme();
  const contextRestaurant = useContext(restaurantContext)
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);

  
  useEffect(() => {
  }, [contextRestaurant])
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  
  const changeExpand = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  return useObserver(() => (
    <div className="overscroll-auto">
      <Image
        alt="complex"
        width={3}
        height={1.5}
        layout="responsive"
        src="/images/tidmun.webp"
        className="rounded-t-5"
      />
      <div className="flex flex-row justify-around my-3">
        <div>
          <StarIcon className="mb-3" style={{ fontSize:'24px' }} />
          <SubHeader className="pl-2">4.7</SubHeader>
        </div>
        <div>
          <PeopleAltIcon className="mb-3" style={{ fontSize:'24px' }} />
          <SubHeader className="pl-2">5 ปาร์ตี้</SubHeader>
        </div>
        <div>
          <MonetizationOnIcon className="mb-2" style={{ fontSize:'24px' }} />
          <SubHeader className="pl-2">{contextRestaurant.currentRestaurant.price} บาท</SubHeader>
        </div>
      </div>
      <div className="px-10">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="รายละเอียด" {...a11yProps(0)} />
            <Tab label="โปรโมชั่น" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            Est duis magna duis magna duis magna aute sint excepteur incididunt reprehenderit incididunt. Culpa aliquip reprehenderit sunt minim. Sunt quis enim ad ut amet. Enim magna ut id cillum dolore consequat voluptate ut enim culpa proident.
            Exercitation velit eiusmod nostrud ex cupidatat eiusmod ex irure nostrud officia sunt. Eiusmod ad in est laboris id amet aliquip cupidatat dolor amet minim exercitation. Enim enim dolor dolore occaecat. Veniam occaecat ipsum qui nostrud enim laboris est anim ullamco occaecat. Sunt id proident laboris est nostrud culpa ut magna voluptate mollit adipisicing proident quis. Anim labore adipisicing nisi pariatur eu do ut commodo. Excepteur do magna anim consectetur eiusmod.
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {
              _.size(contextRestaurant.currentRestaurant.promotions) === 0 ?
                <div className="flex justify-center flex-col w-full h-full py-20">
                  <NoContent text="ไม่มีโปรโมชั่นในตอนนี้" />
                </div>
                :
                _.map(contextRestaurant.currentRestaurant.promotions, (data, index) => (
                  <Accordion expanded={expanded === 'panel1'} onChange={changeExpand('panel1')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>{data.promotion_title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {data.promotion_description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                )
                )
            }
          </TabPanel>
        </SwipeableViews>
        <div className="w-full flex justify-around mb-5">
          <div className="w-1/2">
            Google Map
          </div>
          <div className="w-1/2">
            <RegularText>126 ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140</RegularText>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <a href={`tel://${contextRestaurant.currentRestaurant.tel_no}}`}>
            <PhoneIcon style={{ fontSize: '30px' }} />
            <RegularText className="pl-2">{contextRestaurant.currentRestaurant.tel_no}</RegularText>
          </a>
        </div>
      </div>
    </div>
  ))
}

export default RestaurantInfo

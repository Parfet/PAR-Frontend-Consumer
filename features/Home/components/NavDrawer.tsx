import React from 'react';
import { Button } from '@material-ui/core'

import FilterBar from '../../../core/components/FilterBar';
import { RegularText } from '../../../core/config/textStyle';
import { useUser } from '../../../core/context/auth_context';

interface Props {
  open: boolean
  callBackFormFilter: (value) => void
}

const NavDrawer = (props: Props) => {
	const userContext = useUser();
	const { open, callBackFormFilter } = props
	return (
		<FilterBar open={open} callBackToParent={callBackFormFilter}>
			<>
			<div>
				<RegularText> แก้ไขข้อมูลส่วนตัว </RegularText>
			</div>
			<div className="mt-3">
			<Button color="secondary" onClick={() => userContext.signout()}> ออกจากระบบ </Button>
			</div>
			</>
		</FilterBar>
	)
}

export default NavDrawer
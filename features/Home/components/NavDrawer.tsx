import React from 'react';
import { Button } from '@material-ui/core'

import FilterBar from '../../../core/components/FilterBar';
import { useUser } from '../../../core/context/auth_context';
import { useRouter } from 'next/router';

interface Props {
  open: boolean
  callBackFormFilter: (value) => void
}

const NavDrawer = (props: Props) => {
	const userContext = useUser();
	const router = useRouter();
	const { open, callBackFormFilter } = props
	return (
		<FilterBar open={open} callBackToParent={callBackFormFilter}>
			<>
			<div>
			<Button onClick={() => router.push('/user')}> แก้ไขข้อมูลส่วนตัว </Button>
			</div>
			<div className="mt-3">
			<Button color="secondary" onClick={() => userContext.signout()}> ออกจากระบบ </Button>
			</div>
			</>
		</FilterBar>
	)
}

export default NavDrawer
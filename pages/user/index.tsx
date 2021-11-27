import React from 'react';
import UserPage from '../../features/User/page';
import { useRouter } from 'next/router'


import Navigator from '../../core/components/Navigator'

const user = () => {
    const router = useRouter();

    return (
        <Navigator
            yellow 
            backTextButton='Back'
            backRoute={() => router.push('/')}
            middleText='User'
        >
            <UserPage/>
        </Navigator>   
    )

}

export default user
import React, { useState } from 'react'
import { ProfileNavigation } from './ProfileNavigation'
import Favorites from '@/Pages/Customer/Favorites';


const Profile = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    return (
        
        <div className='lg:flex'>
            <div className='sticky background-red-500' style={{ position: 'relative', width: '100%' }}>
            {/* <div className='sticky h-[80vh] lg:w-{20%} background-red-500'> */}
                <ProfileNavigation open={openSideBar} />


            </div>
            <div className='h-auto ' style={{ position: 'absolute', right: '0', width: '80%', backgroundColor: 'yellow' }}>
            {/* <div className='lg:w-[80%]   text-red-500 ' style={{ position: 'absolute', right: '0', width: '80%', backgroundColor: 'yellow' }}> */}
                {/* <p className='text-gray-700'>hello</p> */}
                <div className='text-red-300'>favorites hello from profile</div>

            </div>
        </div>
    )
}

export default Profile

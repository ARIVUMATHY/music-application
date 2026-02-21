import React from 'react'
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';

const ProfileContainer = () => {
  return (
    <div className='flex flex-col md:flex-row w-full h-full'>
        <ProfileSidebar/>
        <ProfileContent/>
    </div>
  )
}

export default ProfileContainer;
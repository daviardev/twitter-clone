import Image from 'next/image'

import SidebarLink from 'components/SidebarLink'
import Notification from 'components/Icons/Notification'

import { BiHash } from 'react-icons/bi'
import { RiHome7Fill } from 'react-icons/ri'
import { BsBookmark } from 'react-icons/bs'
import { HiOutlineInbox, HiOutlineClipboardList, HiOutlineUser, HiOutlineDotsCircleHorizontal, HiOutlineDotsHorizontal } from 'react-icons/hi'

const Sidebar = () => {
  return (
    <>
      <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
        <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24'>
          <Image
            src='/logo.jpg'
            width={30}
            height={30}
            alt='Logo twitter'
          />
        </div>
        <div className='mt-1 mb-2.5 xl:ml-24'>
          <SidebarLink text='Home' Icon={RiHome7Fill} active />
          <SidebarLink text='Explore' Icon={BiHash} />
          <SidebarLink text='Notifications' Icon={Notification} />
          <SidebarLink text='Messages' Icon={HiOutlineInbox} />
          <SidebarLink text='Bookmarks' Icon={BsBookmark} />
          <SidebarLink text='Lists' Icon={HiOutlineClipboardList} />
          <SidebarLink text='Profile' Icon={HiOutlineUser} />
          <SidebarLink text='More' Icon={HiOutlineDotsCircleHorizontal} />
        </div>
        <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[54px] text-lg shadow-md font-bold hover:bg-[#1a8cd8]'>Tweet</button>
        <div className='text-[#9d9d9d] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto'>
          <Image
            alt='Profile image'
            src='https://yt3.ggpht.com/yti/AHXOFjXXxz_CkO1dprbCdY1D9mPfpirzvxHln1aXvnLTfA=s88-c-k-c0x00ffffff-no-rj-mo'
            width={100}
            height={100}
            className='h-10 w-10 rounded-full xl:mr-2.5'
          />
          <div className='hidden xl:inline mr-7'>
            <h4 className='font-bold'>daviardev</h4>
            <p className='text-[#6e767d]'>@daviardev</p>
          </div>
          <HiOutlineDotsHorizontal className='h-5 hidden xl:inline text-[23px] ml-10' />
        </div>
      </div>
    </>
  )
}

export default Sidebar

import Image from 'next/image'

import SidebarLink from 'components/SidebarLink'
import Notification from 'components/Icons/Notification'

import { BiHash } from 'react-icons/bi'
import { RiHome7Fill } from 'react-icons/ri'
import { BsBookmark } from 'react-icons/bs'
import { HiOutlineInbox, HiOutlineClipboardList, HiOutlineUser, HiOutlineDotsCircleHorizontal } from 'react-icons/hi'

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
        <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
          <SidebarLink text='Home' Icon={RiHome7Fill} active />
          <SidebarLink text='Explore' Icon={BiHash} />
          <SidebarLink text='Notifications' Icon={Notification} />
          <SidebarLink text='Messages' Icon={HiOutlineInbox} />
          <SidebarLink text='Bookmarks' Icon={BsBookmark} />
          <SidebarLink text='Lists' Icon={HiOutlineClipboardList} />
          <SidebarLink text='Profile' Icon={HiOutlineUser} />
          <SidebarLink text='More' Icon={HiOutlineDotsCircleHorizontal} />
        </div>
      </div>
    </>
  )
}

export default Sidebar

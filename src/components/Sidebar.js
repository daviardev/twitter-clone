import Image from 'next/image'
import { useState } from 'react'

import SidebarLink from 'components/SidebarLink'
import Notification from 'components/Icons/Notification'

import { BiHash } from 'react-icons/bi'
import { RiHome7Fill } from 'react-icons/ri'
import { BsBookmark } from 'react-icons/bs'
import { HiOutlineInbox, HiOutlineClipboardList, HiOutlineUser, HiOutlineDotsCircleHorizontal, HiOutlineDotsHorizontal } from 'react-icons/hi'

import { signOut, useSession } from 'next-auth/react'

const Sidebar = () => {
  // Estado de opciones para cerrar sesión
  const [openOptions, setOpenOptions] = useState(false)

  // Datos del usuario
  const { data: session } = useSession()

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
        <div className='text-[#9d9d9d] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto'
        // Una vez le da click al perfil, se abre la ventana para mostrar las opciones y cerrar sesión
        onClick={() => setOpenOptions(prev => !prev)}>
          {/* Cuando el estado de las opciones cambia a true, se muestra la ventana con las opciones junto con la opción de cerrar sesión */}
          {openOptions && (
            <div className='flex flex-col absolute bottom-[6rem] left-[6rem] w-[250px] p-[12px] rounded-lg bg-black border border-solid border-gray-700'>
              <div className='flex flex-col gap-4'>
                <ul className='text-[#d9d9d9]'>
                  <li className='hoverAnimation'>Add an existing account</li>
                  <li className='hoverAnimation' onClick={signOut}>Log out @{session.user.tag}</li>
                </ul>
              </div>
            </div>
          )}

          <Image
            alt='Profile image'
            src={session.user.image}
            width={100}
            height={100}
            className='h-10 w-10 rounded-full xl:mr-2.5'
          />
          
          <div className='hidden xl:inline mr-7'>
            <h4 className='font-bold'>{session.user.name}</h4>
            <p className='text-[#6e767d]'>@{session.user.tag}</p>
          </div>
          <HiOutlineDotsHorizontal className='h-5 hidden xl:inline text-[23px] ml-10' />
        </div>
      </div>
    </>
  )
}

export default Sidebar

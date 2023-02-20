import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import { HiX, HiPhotograph, HiOutlineChartBar, HiOutlineEmojiHappy, HiOutlineCalendar } from 'react-icons/hi'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { useSession } from 'next-auth/react'

import { AppContext } from 'context/AppContext'

import Moment from 'react-moment'

import { db } from 'firebase/client'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const Modal = () => {
  // Extraer texto del input
  const [input, setInput] = useState('')

  // Estado para mostrar ventana de emoji
  const [showEmoji, setShowEmoji] = useState(false)
  
  // Contexto para que la ventana modal se cierre
  const [appContext, setAppContext] = useContext(AppContext)

  // Sesión del usuario
  const { data: session } = useSession()

  // Router para ir al tweet una vez publicado el mensaje
  const router = useRouter()

  // Cerrar ventana modal
  const closeModal = () => {
    setAppContext({ ...AppContext, isModalOpen: false })
  }

  // Post que conecta los datos de la base de datos
  const post = appContext.post

  // Envíar comentario a la base de datos
  const sendComment = async (e) => {
    e.preventDefault()

    await addDoc(collection(db, 'posts', appContext.postId, 'comments'), {
      comment: input,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      createdAt: serverTimestamp()
    })

    // Cerrar ventana modal
    setAppContext({ ...appContext, isModalOpen: false })

    // Limpiar input de texto
    setInput('')

    // Envíar al id del tweet
    router.push(`/${appContext.postId}`)
  }

  // Recorre la lista de los emojis
  const addEmoji = e => {
    const sym = e.unified.split('-')
    const codesArray = []
    sym.forEach(e => codesArray.push('0x' + e))
    const emoji = String.fromCodePoint(...codesArray)

    setInput(input + emoji)
  }

  return (
    <>
      <div className='fixed z-50 inset-0 pt-8' onClick={closeModal}>
        <div
          className='bg-black w-[350px] md:w-[650px] text-white absolute left-[50%] translate-x-[-50%] mt-[40px] p-4 rounded-[20px] border-b border-gray-700'
          onClick={(e) => e.stopPropagation()}
        >
          <HiX className='h-[22px] cursor-pointer' onClick={closeModal} />
          <div className='relative mt-8 grid grid-cols-[48px,1fr] gap-4'>

            <div>
              <img
                src={post?.userImg}
                alt=''
                className='rounded-full'
              />
            </div>

            <div>
              <div className='flex gap-2 text-[12px] md:text-[16px]'>
                <h1>{post?.username}</h1>
                <h2 className='text-gray-500'><Moment fromNow>{post?.createdAt?.toDate()}</Moment></h2>
              </div>
              <p className='text-[12px] md:text-[16px]'>{post?.text}</p>

              <img src={post?.image} className='mt-2 max-h-[250px] rounded-[15px] object-cover' alt='' />

              <p className='mt-4 text-gray-500'>Replying to: <span className='text-[#1d9bf0]'>@{post?.tag}</span></p>

            </div>

            <div className='mt-4'>
              <img className='rounded-full' src={session?.user?.image} alt='' />
            </div>

            <div className='mt-4'>
              {/* Toma el valor del texto del input */}
              <textarea
                className='w-[100%] bg-transparent outline-none text-[18px]'
                rows='4'
                placeholder='Tweet your reply'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <div className='flex justify-between items-center'>
                <div className='icon'>
                  <HiPhotograph className='h-[22px] text-[#1d9bf0] cursor-pointer' />
                </div>
                <div className='icon rotate-90'>
                  <HiOutlineChartBar className='text-[#1d9bf0] h-[22px]' />
                </div>
                  {/* Cerrar ventana modal del emoji */}
                <div className='icon' onClick={() => setShowEmoji(!showEmoji)}>
                  <HiOutlineEmojiHappy className='text-[#1d9bf0] h-[22px]' />
                </div>

                <div className='icon'>
                  <HiOutlineCalendar className='text-[#1d9bf0] h-[22px]' />
                </div>

                {/* Esconde y muestra la ventana de los emojis */}
                {showEmoji && (
                  <div className='absolute mt-[465px] -ml-[60px] max-w-xs rounded-[20px]'>
                    <Picker
                      onEmojiSelect={addEmoji}
                      data={data}
                    />
                  </div>
                )}
                {/* Botón desactivado hasta que recibe el texto y evento de onClick para envíar el comentario */}
                <button
                  disabled={!input.trim()}
                  onClick={sendComment}
                  className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal

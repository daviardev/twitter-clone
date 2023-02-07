import Image from 'next/image'
import { useState, useRef } from 'react'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { db, storage } from 'firebase/client'

import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'

import { HiX, HiPhotograph, HiOutlineChartBar, HiOutlineEmojiHappy, HiOutlineCalendar } from 'react-icons/hi'

const Input = () => {
  const [file, setFile] = useState(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)

  const fileRef = useRef(null)

  const addImageToPost = () => {}

  // Recorre la lista de los emojis
  const addEmoji = e => {
    const sym = e.unified.split('-')
    const codesArray = []
    sym.forEach(e => codesArray.push('0x' + e))
    const emoji = String.fromCodePoint(...codesArray)

    setInput(input + emoji)
  }

  // Postear publicación
  const sendPost = async () => {
    loading && setLoading(true)

    // Refenecia a los datos que se suben cuando se postea un twit
    const docRef = await addDoc(collection(db, 'posts'), {
      // id: session.user.uid,
      // username: session.user.name,
      // userImg: session.user.image,
      // tag: session.user.tag,
      text: input,
      createdAt: serverTimestamp()
    })

    // Se crea una ruta para cada imagen
    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    // Cuando se sube una imagen, se hace referencia a la ruta para obtener el string de la URL de la imagen
    // para que de esa manera actualizarla y que la pueda colocar en el firestore correspondiente al twit
    if (file) {
      await uploadString(imageRef, file, 'data_url')
        .then(async () => {
          const downloadUrl = await getDownloadURL(imageRef)
          await updateDoc(doc(db, 'posts', docRef.id), {
            image: downloadUrl
          })
        })
    }

    setLoading(false) // Cuando termina de postear, deja de cargar
    setInput('') // El input se vacía
    setFile(null) // No hay archivos seleccionados
    setShowEmoji(false) // Cierra la ventana de emojis
  }

  return (
    <>
      <div className='border-b border-gray-700 p-3 flex space-x-3 overflow-y-hidden'>
        <Image
          src='https://yt3.ggpht.com/yti/AHXOFjXXxz_CkO1dprbCdY1D9mPfpirzvxHln1aXvnLTfA=s88-c-k-c0x00ffffff-no-rj-mo'
          alt='Profile image'
          width={100}
          height={100}
          className='h-11 w-11 rounded-full cursor-pointer'
        />
        <div className='w-full divide-y divide-gray-700'>
          <div className={`${file && 'pb-7'} ${input && 'space-y-2.5'}`}>
            <textarea
              rows={2}
              cols={68}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="What's happening?"
              className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] max-h-[200px]'
            />
            {file && (
              <div className='relative'>
                <div
                  className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                  onClick={() => setFile(null)}
                >
                  <HiX className='text-white h-5' />
                </div>
                <Image
                  src={file}
                  alt='Photo'
                  width={30}
                  height={30}
                  className='rounded-2xl max-h-80 object-contain'
                />
              </div>
            )}
          </div>
          <div className='flex items-center justify-between pt-2.5'>
            <div className='flex items-center'>
              <div
                // Al hacer referencia al input y dar clic al ícono, se abre la ventana para
                // seleccionar la imagen
                className='icon' onClick={() => fileRef.current.click()}
              >
                <HiPhotograph className='h-[22px] text-[#1d9bf0]' />
                <input
                  ref={fileRef}
                  type='file'
                  hidden
                  accept='image/*' // Acepta todos las extensiones de imágenes
                  onChnage={addImageToPost}
                />
              </div>

              <div className='icon rotate-90'>
                <HiOutlineChartBar className='text-[#1d9bf0] h-[22px]' />
              </div>

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

            </div>
            <button
              className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
              // EL botón no se habilita hasta que reciba un String y no un espacio vacío
              disabled={!input.trim() && !file}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Input

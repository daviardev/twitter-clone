import Image from 'next/image'
import { useState } from 'react'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { db, storage } from 'firebase/client'

import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'

import { useSession } from 'next-auth/react'

import { HiX, HiPhotograph, HiOutlineChartBar, HiOutlineEmojiHappy, HiOutlineCalendar } from 'react-icons/hi'

const Input = () => {
  // Estado de archivo para cuando seleccione una imagen
  const [file, setFile] = useState(null)

  // Toma lo que se escriba en el input de texto
  const [input, setInput] = useState('')

  // Estado de carga al envíar un nuevo tweet
  const [loading, setLoading] = useState(false)

  // Mostrar la ventana para seleccionar los emojis
  const [showEmoji, setShowEmoji] = useState(false)

  // Detecta y toma todos los datos del usuario logueado
  // Al usar session, se tiene disponible usar el nombre, tag, img del usuario autenticado
  const { data: session } = useSession()

  // Función que se encarga de añadir la imagen seleccionada del dispositivo al tweet
  const addImageToPost = e => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setFile(readerEvent.target.result)
    }
  }

  // Recorre la lista de los emojis
  const addEmoji = e => {
    const sym = e.unified.split('-')
    const codesArray = []
    sym.forEach(e => codesArray.push('0x' + e))
    const emoji = String.fromCodePoint(...codesArray)

    setInput(input + emoji)
  }

  // Envía el tweet a la base de datos con todos los datos correspondientes
  const sendPost = async () => {
    if (loading) return
    setLoading(true)
    // Refenecia a los datos que se suben cuando se postea un tweet
    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid, // Id único de cada usuario
      username: session.user.name, // Nombre de usuario
      userImg: session.user.image, // Imagen de perfil del usuario
      tag: session.user.tag, // Nombre en minúsculas y sin espacios del usuario
      text: input, // Texto que se toma del input de texto
      createdAt: serverTimestamp() // Crear la fecha, hora y segundos de cuando se hiso el tweet
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
      <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-hidden ${loading && 'opacity-60'}`}>
        <Image
          src={session.user.image}
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
            {/* Cuando se selecciona un archivo, este se posiciona del tal manera que sea visible para tener una previsualización de la imagen */}
            {file && (
              <div className='relative'>
                <div
                  className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                  onClick={() => setFile(null)} // Llama el estado del archivo para cancelar la imagen seleccionada
                >
                  <HiX className='text-white h-5' />
                </div>
                {/* Imagen seleccionada */}
                <img
                  src={file}
                  alt='Photo'
                  className='rounded-2xl max-h-80 object-contain'
                />
              </div>
            )}
          </div>
          {/* Cuando no esté cargando el tweet al envíar puede escribir, mientras se sube no puede hacerlo para evitar que pueda hacer post mientras se está subiendo un tweet */}
          {!loading && (
            <div className='flex items-center justify-between pt-2.5'>
              <div className='flex items-center'>
                <div
                // Al hacer referencia al input y dar clic al ícono, se abre la ventana para
                // seleccionar la imagen
                  className='icon'
                >
                  <label htmlFor='file'>
                    <HiPhotograph className='h-[22px] text-[#1d9bf0] cursor-pointer' />
                  </label>
                  {/* Input para subir la imagen */}
                  <input
                    id='file'
                    type='file'
                    accept='image/*'
                    hidden
                    onChange={addImageToPost}
                  />
                </div>

                <div className='icon rotate-90'>
                  <HiOutlineChartBar className='text-[#1d9bf0] h-[22px]' />
                </div>

                {/* Abrir ventana para seleccionar los emojis */}
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
          )}
        </div>
      </div>
    </>
  )
}

export default Input

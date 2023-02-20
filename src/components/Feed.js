import { useEffect, useState } from 'react'

import { HiOutlineSparkles } from 'react-icons/hi'

import Input from 'components/Input'

import { db } from 'firebase/client'

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Posts from './Posts'

const Feed = () => {
  // Se crea estado el cual se encarga de listar los posts
  const [posts, setPosts] = useState([])

  // Función que obtiene los post en todo momento por fecha de creación y en ordes decesndente
  useEffect(() => {
    onSnapshot(
      query(collection(db, 'posts'), orderBy('createdAt', 'desc')), // Get and order posts
      snapshot => {
        setPosts(snapshot.docs)
      }
    )
  }, [db])
  return (
    <>
      <div className='flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]'>
        <div className='text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-[#000000aa] border-b border-gray-700 backdrop-blur'>
          <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
          <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
            <HiOutlineSparkles className='h-5 text-white' />
          </div>
        </div>

        <Input />
        <div className='pb-72'>
          {/* Se hace el renderizado de los post hechos */}
          {posts.map(post => (
            <Posts
              id={post.id}
              key={post.id}
              post={post.data()}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Feed

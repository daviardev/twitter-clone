import { useContext } from 'react'

import { useSession, getSession } from 'next-auth/react'

import Modal from 'components/Modal'
import Login from 'components/Login'
import Sidebar from 'components/Sidebar'
import SinglePost from 'components/SinglePost'

import { AppContext } from 'context/AppContext'

const PostPage = ({ post }) => {
  const { data: session } = useSession()
  const [appContext] = useContext(AppContext)

  if (!session) return <Login />

  return (
    <div>
      <main className='relative max-w-[1400px] mx-auto'>
        <Sidebar />
        <div className='flex gap-6'>
          <SinglePost />
          {appContext?.isModalOpen && <Modal />}
        </div>
      </main>

    </div>
  )
}

export default PostPage

export async function getServerSideProps (context) {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}

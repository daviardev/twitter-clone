import Head from 'next/head'

import Feed from 'components/Feed'
import Modal from 'components/Modal'
import Login from 'components/Login'
import Widget from 'components/Widget'
import Sidebar from 'components/Sidebar'

import { getProviders, useSession, getSession } from 'next-auth/react'

import { AppContext } from 'context/AppContext'
import { useContext } from 'react'

export default function Home ({ providers }) {
  const { data: session } = useSession()

  const [appContext] = useContext(AppContext)

  if (!session) return <Login providers={providers} />
  return (
    <div>
      <Head>
        <title>Home / Twitter</title>
        <meta name='description' content='Twitter clone with Nextjs and firebase 9' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        <Feed />
        <Widget />
        {/* Cerrar y abrir la ventana modal */}
        {appContext?.isModalOpen && <Modal />}
      </main>
    </div>
  )
}
// Obtiene la sesión
export async function getServerSideProps (context) {
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      providers,
      session
    }
  }
}

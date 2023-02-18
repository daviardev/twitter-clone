import Head from 'next/head'

import Feed from 'components/Feed'
import Modal from 'components/Modal'
import Login from 'components/Login'
import Sidebar from 'components/Sidebar'

import { getProviders, useSession, getSession } from 'next-auth/react'

import { AppContext } from 'context/AppContext'
import { useContext } from 'react'

export default function Home ({ trendingResults, followResults, providers }) {
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
        {/* Widgets */}
        {/* If click modal, modal open */}
        {appContext?.isModalOpen && <Modal />}
      </main>
    </div>
  )
}
// API for get new notice and detect session
export async function getServerSideProps (context) {
  const newsResults = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json')
    .then((res) => res.json())

  const randomUsersResults = await fetch('https://randomuser.me/api/?results=30&inc=name,login,picture')
    .then((res) => res.json())

  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      newsResults,
      randomUsersResults,
      providers,
      session
    }
  }
}

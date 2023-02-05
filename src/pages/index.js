import Head from 'next/head'

import Sidebar from 'components/Sidebar'

const Home = () => {
  return (
    <>
      <Head>
        <title>Home / Twitter</title>
        <meta name='description' content='Twitter clone with Nextjs and firebase 9' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        {/* Feed */}
        {/* Widgets */}

        {/* Modal */}
      </main>
    </>
  )
}

export default Home

import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'

import 'styles/globals.css'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default App

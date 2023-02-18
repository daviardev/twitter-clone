import { AppContextProvider } from 'context/AppContext'
import { SessionProvider } from 'next-auth/react'

import 'styles/globals.css'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  )
}

export default App

import { AppContextProvider } from 'context/AppContext'
import { SessionProvider } from 'next-auth/react'

import 'styles/globals.css'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    // Se envuelve la conexión con la sesión del usuario
    <SessionProvider session={session}>
      {/* Se envuelve el contexto con el componente */}
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  )
}

export default App

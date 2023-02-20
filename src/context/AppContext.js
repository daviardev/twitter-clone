import { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppContextProvider = props => {
  // Contexto que aplica a la ventana modal para cerrarla y abrirla
  const [appContext, setAppContext] = useState({})

  // Se encierra todo el contexto para envolver _app
  return (
    <AppContext.Provider value={[appContext, setAppContext]}>
      {props.children}
    </AppContext.Provider>
  )
}

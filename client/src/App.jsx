import{Routes, Route,Navigate} from "react-router-dom"
import Chat from "./pages/Chat"
import Register from "./pages/Register"
import Login from "./pages/Login"
import '@mantine/core/styles.css';

import NavBar from "./components/Navbar"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { ChatContextProvider } from "./context/ChatContext"
import { MantineProvider, createTheme } from "@mantine/core"

function App() {
  const { user } = useContext(AuthContext)
  
  const theme = createTheme({
    /** Put your mantine theme override here */
    
});
  return (
    <MantineProvider theme={theme}>
      <ChatContextProvider user={user}>
         <NavBar/>
      <Routes>
          <Route path="/" element={ user ?< Chat/> : <Login/>} />
          <Route path="/register" element={ user ?< Chat/> : <Register/>} />
          <Route path="/login" element={ user ?< Chat/> : <Login/>} />
          <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
        </ChatContextProvider>
    </MantineProvider>
  )
}

export default App

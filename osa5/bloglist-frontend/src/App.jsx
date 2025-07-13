import { useState, useEffect } from 'react'
import LoginView from './components/LoginView'
import BlogsView from './components/BlogsView'

const App = () => {
  
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSetUser = (userObj) =>{
    setUser(userObj)
  }
  const handleErrormessage = (e) => {
    setErrorMessage(e)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const loginForm = () => (
    <LoginView 
        onUserLogin = {handleSetUser}
        onErrorMessage = {handleErrormessage}
      />
  )
  const blogsScene = () => (
    <BlogsView />
  )
  
  return (
    <div>
      {!user && loginForm()}
      {user && blogsScene()}
    </div>
  )
  
}

export default App
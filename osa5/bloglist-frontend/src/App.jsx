import { useState, useEffect } from 'react'
import LoginView from './components/LoginView'
import LogoutView from './components/LogoutView'
import BlogsView from './components/BlogsView'
import blogsService from './services/blogs'

const App = () => {
  
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect (() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      setUser(loggedInUser)
      blogsService.setToken(loggedInUser.token)
    }
  }, [])

  const handleSetUser = (userObj) =>{
    setUser(userObj)
    blogsService.setToken(userObj.token)
  }
  const handleUserLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    blogsService.setToken(null)
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
  const logoutForm = () =>(
    <LogoutView 
      userName = {user.name}
      onUserLogout = {handleUserLogout}
    />
  )
  const blogsScene = () => (
    <BlogsView />
  )
  
  return (
    <div>
      <h2>Blogs</h2>
      {!user && loginForm()}
      {user && logoutForm()}
      <br/>
      {user && blogsScene()}
    </div>
  )
  
}

export default App

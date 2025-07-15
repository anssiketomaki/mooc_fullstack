import { useState, useEffect } from 'react'
import LoginView from './components/LoginView'
import LogoutView from './components/LogoutView'
import BlogsView from './components/BlogsView'
import blogsService from './services/blogs'
import NewBlogView from './components/NewBlogView'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newNotification, setNewNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect (() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      setUser(loggedInUser)
      blogsService.setToken(loggedInUser.token)
    }
  }, [])

  useEffect(() => {
    if(user) {
        blogsService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  const handleSetUser = (userObj) =>{
    setUser(userObj)
    blogsService.setToken(userObj.token)
  }
  const handleUserLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    blogsService.setToken(null)
  }
  const handleNewBlog = (newBlog) =>{
    setBlogs(blogs.concat(newBlog))
    handleNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
  }
  const handleNotification = (notification) => {
    setNewNotification(notification)
    setTimeout(() =>{
      setNewNotification(null)
    }, 5000)
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
  const newBlogForm = () =>(
    <NewBlogView
      onNewBlog = {handleNewBlog}
      onErrorMessage = {handleErrormessage}
    />
  )
  const blogsScene = () => (
    <BlogsView 
      blogs = {blogs}
    />
  )
  const showNotification = () => (
    <Notification
      notification = {newNotification}
    />
  )
  const showErrorMessage = () => (
    <ErrorMessage
      message = {errorMessage}
    />
  )
  
  return (
    <div>
      <h2>Blogs</h2>
      {newNotification && showNotification()}
      <br/>
      {errorMessage && showErrorMessage()}
      <br/>
      {!user && loginForm()}
      {user && logoutForm()}
      <br/>
      {user && newBlogForm()}
      <br/>
      {user && blogsScene()}
    </div>
  )
  
}

export default App

import { useState, useEffect } from 'react'
import LoginView from './components/LoginView'
import LogoutView from './components/LogoutView'
import BlogsView from './components/BlogsView'
import blogsService from './services/blogs'
import NewBlogView from './components/NewBlogView'

const App = () => {
  
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
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
  
  return (
    <div>
      <h2>Blogs</h2>
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

import React, { useState } from 'react'
import blogsService from '../services/blogs'

const NewBlogView = ({onNewBlog, onErrorMessage}) =>  {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async (event) =>{
        event.preventDefault()
        console.log('adding new blog titled:', title)

        try {
            const blog = await blogsService.create({
                title, author, url
            })
            onNewBlog(blog)
            setTitle('')
            setAuthor('')
            setUrl('')
        }catch (exception){
            onErrorMessage('wrong credentials')
        }
    }

    return (
        <div>
            <h2>Create new</h2>

            <form onSubmit={handleNewBlog}>
                <div>

                    <label htmlFor="title-inpput">title:</label>
                        <input 
                        type="text" 
                        value={title}
                        name="Title"
                        onChange = {({ target }) => setTitle(target.value)}
                        />
                </div>
                <div>
                    <label htmlFor="author-input">author:</label>
                        <input 
                        type="text" 
                        value={author}
                        name="Author"
                        onChange = {({ target }) => setAuthor(target.value)}
                        />
                </div>
                <div>
                    <label htmlFor="url-input">url:</label>
                        <input 
                        type="text" 
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                        />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default NewBlogView

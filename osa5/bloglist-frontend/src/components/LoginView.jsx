import React, { useState } from 'react'
import loginService from '../services/login'

const LoginView = (props) =>  {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) =>{
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password
            })
            props.onUserLogin(user)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
        }catch (exception){
            props.onErrorMessage('wrong credentials')
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                        <input 
                        type="text" 
                        value={username}
                        name="Username"
                        onChange = {({ target }) => setUsername(target.value)}
                        />
                </div>
                <div>
                    password
                        <input 
                        type="password" 
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                        />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginView

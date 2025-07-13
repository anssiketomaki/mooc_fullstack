import loginService from '../services/login'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) =>{
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginservi
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
                    password
                        <input 
                        type="text" 
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                        />
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
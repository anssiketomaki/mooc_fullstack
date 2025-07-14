
const LogoutView = (props) =>  {

    const handleLogout = (event) =>{
        event.preventDefault()
        props.onUserLogout()
    }

    return (
        <div>
            <form onSubmit={handleLogout}>
                {props.userName} logged in 
                <button type="submit">logout</button>
            </form>
        </div>
    )
}

export default LogoutView

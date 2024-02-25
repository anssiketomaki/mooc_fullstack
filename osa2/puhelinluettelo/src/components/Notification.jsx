import App from '../App'

const Notification = ({notification}) => {

    const messageStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if(notification !== null){
        return(
            <div style={messageStyle}>
                {notification}
            </div>
        )
    }

}

export default Notification;

import PropTypes from 'prop-types';

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
    
    return(
        <div style={messageStyle}>
            {notification}
        </div>
    )
}

Notification.propTypes = {
  notification: PropTypes.string,
};
export default Notification;

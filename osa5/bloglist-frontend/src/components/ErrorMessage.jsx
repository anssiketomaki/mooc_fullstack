import PropTypes from 'prop-types';

const ErrorMessage = ({message}) => {

    const messageStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    
    return(
        <div style={messageStyle}>
            {message}
        </div>
    )
    

}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
export default ErrorMessage;

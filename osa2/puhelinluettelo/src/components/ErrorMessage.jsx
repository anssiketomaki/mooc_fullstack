
import PropTypes from 'prop-types';

const ErrorMessage = ({error}) => {
    const messageStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    
    if (error !== null){
        return(
        <div style={messageStyle}>
            {error}
        </div>
        )
    }
    return null;
}

ErrorMessage.propTypes = {
    error: PropTypes.string
};

export default ErrorMessage;

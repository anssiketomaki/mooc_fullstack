import App from '../App'

const Listing = ({name, onShowButtonClick}) =>{
    const handleShowButtonClick = () => {
        onShowButtonClick(name);
    };
    
    const buttonStyle = {
        color: 'gray',
        marginLeft: '10px',
        fontSize: '14px'
    }
    
    return(
        <li>
            {name} 
            <button type="button"
                    style={buttonStyle} onClick={handleShowButtonClick}>Show</button>
        </li>
        
    )
}


export default Listing

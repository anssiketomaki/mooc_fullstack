import ReactDOM from 'react-dom/client'

import App from '../App'

const Part = (props) =>{

    return(
        <div>
            <p>{props.name} {props.ex}</p>
        </div>
    )
}
const Total = (props) => {

}

const Course = (props) => {
    console.log('Hello from Course.jsx')
    const {name, id, parts} = props.course
    const total = parts.reduce((acc, current) => {
                        return acc + current.exercises;
                    }, 0);
    return(
        <div>
            <h2>{name}</h2>
            
            {parts.map( part =>
                <Part key={part.id} name={part.name} ex={part.exercises} />
                )}
            <b>total of {total} exercises</b>
            
        </div>
    )

}

export default Course

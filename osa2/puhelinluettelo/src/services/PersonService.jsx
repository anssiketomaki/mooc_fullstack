//import App from '../App'
import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () =>{
    return axios.get(baseUrl)
}
const create = newPerson =>{
    return axios.post(baseUrl, newPerson)
}
const update = (id, updatedP) =>{
    return axios.put(`${baseUrl}/${id}`,updatedP)
}
const deletePerson = (id) =>{
    return axios.delete(`${baseUrl}/${id}`)
}

export default{
    getAll: getAll,
    create: create,
    update: update,
    deletePerson: deletePerson
}
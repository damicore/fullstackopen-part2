import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = (personObj) => {
  return axios
    .post(baseUrl, personObj)
    .then(response => response.data)
}

const dltFromDb = id => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}

const put = (changedPerson) => {
    return axios
      .put(`${baseUrl}/${changedPerson.id}`, changedPerson)
      .then(response => response.data)
}

export default {getAll, create, dltFromDb, put}
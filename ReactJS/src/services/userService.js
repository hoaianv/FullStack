import axios from '../axios'

const handleLoginAPI = (username, password) => {
  return axios.post('/api/login', { email: username, password: password })
}
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-user?id=${inputId}`)
}
const CreateNewUserService = (data) => {
  return axios.post('/api/create-new-user', data)
}
const DeleteUserService = (userId) => {
  return axios.delete('/api/delele-user', {
    data: {
      id: userId,
    },
  })
}
const EditUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData)
}
const getAllCodeService = (inputType) =>{
  return axios.get(`/api/allcode?type=${inputType}`)
}
const getAllDoctorService = (inputLimit) => {
  return axios.get(`/api/top-doctor-home?limit=${inputLimit}`)
}
export {
  handleLoginAPI,
  getAllUsers,
  CreateNewUserService,
  DeleteUserService,
  EditUserService,
  getAllCodeService,
  getAllDoctorService
}

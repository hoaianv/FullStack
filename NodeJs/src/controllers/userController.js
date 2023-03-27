import userService from '../service/userServices'
let handleLogin = async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  let userData = ''
  if (!email || !password) {
    return res.status(200).json({
      errcode: 1,
      message: 'missing inputs parameter!',
    })
  }

  userData = await userService.handleUserLogin(email, password)

  return res.status(200).json({
    userData,
  })
}
let HandleGetAllUser = async (req, res) => {
  let id = req.query.id //all or id
  let users = await userService.GetAllUser(id)
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing require parameter',
      users: {},
    })
  }
  return res.status(200).json({
    errCode: 0,
    errMessage: 'ok',
    users,
  })
}

let HandleCreateNewUser = async (req, res) => {
  let Message = await userService.CreateNewUser(req.body)
  console.log(Message)
  return res.status(200).json(Message)
}
let HandleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required parameter!!',
    })
  }

  let message = await userService.DeleteUser(req.body.id)

  return res.status(200).json(message)
}
let HandleEditUser = async (req, res) => {
  let user = req.body
  let message = await userService.EditUser(user)
  return res.status(200).json(message)
}
 let getAllCode = async (req,res) =>{
  try {
    let data = await userService.getAllCodeService(req.query.type)
    return res.status(200).json(data)

  } catch (e) {
    return res.status(200).json({
      errCode:-1,
      errMessage:'Error from server '
    })
  }
 }
module.exports = {
  handleLogin: handleLogin,
  HandleGetAllUser: HandleGetAllUser,
  HandleCreateNewUser: HandleCreateNewUser,
  HandleDeleteUser: HandleDeleteUser,
  HandleEditUser: HandleEditUser,
  getAllCode:getAllCode,
}

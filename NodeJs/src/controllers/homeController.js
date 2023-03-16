import db from '../models/index'
import CRUDservices from '../service/CRUDservices'
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll()

    return res.render('homepage.ejs', {
      data: JSON.stringify(data),
    })
  } catch (error) {
    console.log(error)
  }
}
let getAboutHome = (req, res) => {
  return res.render('test/abouthome.ejs')
}
let getCRUD = (req, res) => {
  return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
  let message = await CRUDservices.createNewUser(req.body)
  console.log('check req body:', req.body)
  console.log(message)

  return res.send('post crud from server')
}
let displayGetCRUD = async (req, res) => {
  let data = await CRUDservices.getAllUser()
  return res.render('displayCRUD.ejs', {
    dataTable: data,
  })
}
let getEditCRUD = async (req, res) => {
  let userId = req.query.id
  if (userId) {
    let userData = await CRUDservices.GetUserInforByID(userId)

    return res.render('editCRUD.ejs', {
      user: userData,
    })
  } else {
    return res.send('Not found!!!!')
  }
}
let putCRUD = async (req, res) => {
  let user = req.body
  let allUser = await CRUDservices.updateUserData(user)
  return res.render('displayCRUD.ejs', {
    dataTable: allUser,
  })
}
let deleteCRUD = async (req, res) => {
  let id = req.query.id
  if (id) {
    await CRUDservices.deleteUserById(id)
    res.send('delete the user succeed!')
  } else {
    res.send('user not found')
  }
}
module.exports = {
  getHomePage: getHomePage,
  getAboutHome: getAboutHome,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
}

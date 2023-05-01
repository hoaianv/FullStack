import Express from 'express'
import userController from '../controllers/userController.js'
import homeController from '../controllers/homeController.js'
import doctorController from '../controllers/doctorController.js'
let router = Express.Router()

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage)
  router.get('/about', homeController.getAboutHome)
  router.get('/crud', homeController.getCRUD)
  router.post('/post-crud', homeController.postCRUD)
  router.get('/get-crud', homeController.displayGetCRUD)
  router.get('/edit-crud', homeController.getEditCRUD)
  router.post('/put-crud', homeController.putCRUD)
  router.get('/delete-crud', homeController.deleteCRUD)

  router.post('/api/login', userController.handleLogin)
  router.get('/api/get-all-user', userController.HandleGetAllUser)
  router.post('/api/create-new-user', userController.HandleCreateNewUser)
  router.delete('/api/delele-user', userController.HandleDeleteUser)
  router.put('/api/edit-user', userController.HandleEditUser)

  router.get('/api/allcode',userController.getAllCode)
  router.get('/api/top-doctor-home',doctorController.getTopDoctorHome)



  router.get("/api/get-all-doctors",doctorController.GetAllDoctor)
  router.post("/api/save-info-doctors",doctorController.PostInfoDoctor)
  router.get("/api/get-detail-doctor-by-id",doctorController.GetDetailDoctorById)
  return app.use('/', router)
}

module.exports = initWebRoutes

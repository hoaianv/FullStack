import Express from 'express'
import userController from '../controllers/userController.js'
import homeController from '../controllers/homeController.js'
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
  return app.use('/', router)
}

module.exports = initWebRoutes

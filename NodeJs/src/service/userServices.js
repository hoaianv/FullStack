import db from '../models'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {}
      let isExist = await checkUserEmail(email)
      if (isExist) {
        userData.message = 'email oke'
        // user already exist

        let user = await db.User.findOne({
          attributes: ['email', 'lastName', 'password'],
          where: { email: email },
          raw: true,
        })
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password)

          if (check) {
            userData.errcode = 0
            userData.message = 'oke'
            console.log(user)
            delete user.password
            userData.user = user
          } else {
            userData.errcode = 3
            userData.message = 'Wrong password!!'
            userData.user = user
          }
        }
      } else {
        //return err
        userData.errcode = 2
        userData.message = `Your's Email isn't exist in your system. Plz try other email!`
      }
      resolve(userData)
    } catch (error) {
      reject(error)
    }
  })
}
let checkUserEmail = (UserEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: UserEmail },
      })
      if (user) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}

let GetAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = ''
      if (userId === 'ALL') {
        users = await db.User.findAll({
          raw: true,
          attributes: { exclude: ['password'] },
        })
      }
      if (userId && userId !== 'ALL') {
        users = await db.User.findOne({
          where: { id: userId },
          raw: true,
          attributes: { exclude: ['password'] },
        })
      }
      resolve(users)
    } catch (error) {
      reject(error)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hassPassword = await bcrypt.hashSync(password, salt)
      resolve(hassPassword)
    } catch (error) {
      reject(error)
    }
  })
}

let CreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email)

      if (check === true) {
        resolve({
          errCode: 1,
          message: 'Your email is already in used.Plzz try another email!!!',
        })
      }

      if (check === false) {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password)
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          numberphone: data.numberphone,
          gender: data.gender ,
          roleId: data.roleId,
          positionId: data.positionId,
        })
        resolve({
          errCode: 0,
          message: 'oke',
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}
// let DeleteUser = (userId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let user = await db.User.findOne({ where: { id: userId } })
//       if (!user) {
//         resolve({
//           errCode: 3,
//           message: 'user not found!',
//         })
//       }
//       await user.destroy()

//       resolve({
//         errCode: 0,
//         message: 'Delete oke!!!',
//       })
//     } catch (error) {
//       reject(error)
//     }
//   })
// }
let DeleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDelete = await db.User.findOne({ where: { id: userId } })
      if (!userDelete) {
        resolve({
          errCode: 3,
          message: 'user not found!',
        })
      }

      console.log(userDelete)
      await db.User.destroy({
        where: { id: userDelete.id },
      })
      resolve({
        errCode: 0,
        message: 'Delete oke!!!',
      })
    } catch (error) {
      reject(error)
    }
  })
}
let EditUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          message: 'Missing required parameters',
        })
      }

      let user = await db.User.findOne({ where: { id: data.id }, raw: false })
      if (user) {
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.address = data.address
        await user.save()
        resolve({
          errCode: 0,
          message: 'Update to the succeed',
        })
      }
      resolve({
        errCode: 2,
        message: `user is  existn't`,
      })
    } catch (error) {
      reject(error)
    }
  })
}
let getAllCodeService = (typeInput) =>{
  return new Promise (async (resolve,reject)=>{
    try {
      let res ={}
      if(!typeInput){
res.errCode = 1,
res.errMessage = 'Missing required parameters'
      }else{
         let allcode = await db.allcode.findAll({
          where: {type: typeInput}
        })
        res.errCode = 0,
        res.data = allcode
      }
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  handleUserLogin: handleUserLogin,
  GetAllUser: GetAllUser,
  CreateNewUser: CreateNewUser,
  DeleteUser: DeleteUser,
  EditUser: EditUser,
  getAllCodeService:getAllCodeService,
}

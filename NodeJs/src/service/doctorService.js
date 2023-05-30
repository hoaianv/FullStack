import { raw } from 'body-parser'
import db from '../models/index'

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {
                    roleId: "R2"
                },
                order: [['createdAt', 'DESC']],

                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.allcode, as: 'positionData', attributes: ['valueVn', 'valueVi'] },
                    { model: db.allcode, as: 'genderData', attributes: ['valueVn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (error) {
            reject(error)
        }
    })
}
let GetAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {
                    roleId: 'R2'
                }, attributes: {
                    exclude: ['password']
                },
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)

        }
    })
}
let PostSaveInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkDown || !inputData.action) {
                console.log("check actions", inputData)

                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!!"
                })
            } else {

                if (inputData.action === 'CREATE') {
                    await db.MarkDown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkDown: inputData.contentMarkDown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                } else if (inputData.action === 'EDIT') {
                    let DoctorMarkDown = await db.MarkDown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    console.log("check DoctorMarkDown", DoctorMarkDown)
                    if (DoctorMarkDown) {

                        DoctorMarkDown.contentHTML = inputData.contentHTML,
                            DoctorMarkDown.contentMarkDown = inputData.contentMarkDown,
                            DoctorMarkDown.description = inputData.description,
                            await DoctorMarkDown.save()
                    }


                }


                resolve({
                    errCode: 0,
                    errMessage: "save dotor success"
                })
            }
        } catch (error) {
            reject(error)
        }

    })
}
let GetDetailDoctorByIdSer = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check input id", inputId)
            if (!inputId) {
                resolve({
                    errCode: 3,
                    errMessage: "Missing parameter id!!"
                })
            } else {
                let doctor = await db.User.findOne({
                    where: {
                        id: inputId,
                        roleId: "R2"

                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.MarkDown },
                        { model: db.allcode, as: 'positionData', attributes: ['valueVn', 'valueVi'] },

                    ],
                    raw: false,
                    nest: true


                })
                if (doctor && doctor.image) {
                    doctor.image = new Buffer(doctor.image, "base64").toString("binary")
                }

                if (!doctor) {
                    doctor = {}
                }
                resolve({
                    errCode: 0,
                    data: doctor
                })

            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    GetAllDoctor: GetAllDoctor,
    PostSaveInfoDoctor: PostSaveInfoDoctor,
    GetDetailDoctorByIdSer: GetDetailDoctorByIdSer
}
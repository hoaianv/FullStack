import db from '../models/index'

 let getTopDoctorHome =  (limitInput) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {
                    roleId: "R2"
                },
                order:[['createdAt','DESC']],

                attributes:{
                    exclude:['password']
                },
                include:[
                    {model:db.allcode,as:'positionData', attributes:['valueVn','valueVi']},
                    {model:db.allcode,as:'genderData', attributes:['valueVn','valueVi']}
                ],
                raw: true,
                nest:true
            })
            resolve({
                errCode:0,
                data:users
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports={
    getTopDoctorHome:getTopDoctorHome
}
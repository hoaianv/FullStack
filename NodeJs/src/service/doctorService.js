import db from '../models/index'

 let getTopDoctorHome =  (limitInput) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order:[['createdAt','DESC']],
                where: {
                    roleId: "R2"
                },
                attributes:{
                    exclude:['password','image']
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
import doctorService from "../service/doctorService"

let getTopDoctorHome = async (req,res) =>{
    let limit = req.query.limit
    if(!limit) limit = 10
    try {
        let response = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:1,
            message:"error from server"
        })
        
    }
}
let GetAllDoctor = async (req,res)=>{
    try {
        let doctors = await doctorService.GetAllDoctor(req.body)
        return res.status(200).json(
           doctors
        )

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:1,
            message:"error from server"
        })
    }
}
let PostInfoDoctor = async (req,res) =>{
    try {
        let response = await doctorService.PostSaveInfoDoctor(req.body)
        return res.status(200).json(
            response
         )
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:1,
            message:"error from server"
        })
    }
}
let GetDetailDoctorById = async (req,res) => {
    try {
        console.log("check req id", req.body.id)
        let response = await doctorService.GetDetailDoctorByIdSer(req.body.id)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:1,
            message:"error from server"
        })
    }
}
module.exports = {
    getTopDoctorHome:getTopDoctorHome,
    GetAllDoctor:GetAllDoctor,
    PostInfoDoctor:PostInfoDoctor,
    GetDetailDoctorById:GetDetailDoctorById

}
import actionTypes from './actionTypes'
import { getAllCodeService, CreateNewUserService, getAllUsers, DeleteUserService, EditUserService, getAllDoctorService ,getAllDoctorsDespriptions,CreateNewDoctorSer} from '../../services/userService'
import { toast } from 'react-toastify'
// export const FetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// })
// GENDER
export const FetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {

                dispatch(FetchGenderSuccess(res.data))

            } else {
                dispatch(FetchGenderFailed())
            }
        } catch (e) {
            dispatch(FetchGenderFailed())
            console.log(e)
        }

    }
}
export const FetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const FetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})



//POSITON
export const FetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {

                dispatch(FetchPositionSuccess(res.data))

            } else {
                dispatch(FetchPositionFailed())
            }
        } catch (e) {
            dispatch(FetchPositionFailed())
            console.log(e)
        }

    }
}

export const FetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const FetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})
//ROLE

export const FetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")

            if (res && res.errCode === 0) {

                dispatch(FetchRoleSuccess(res.data))

            } else {
                dispatch(FetchRoleFailed())
            }
        } catch (e) {
            dispatch(FetchRoleFailed())
            console.log(e)
        }

    }
}

export const FetchRoleSuccess = (positionData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: positionData
})

export const FetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})


export const CreateUserStart = (data) => {

    return async (dispatch, getState) => {
        try {
            let res = await CreateNewUserService(data)

            if (res && res.errCode === 0) {
                toast.success("Create a new user")
                dispatch(CreateUserSuccess())

                dispatch(FetchAllUserStart())

            } else {
                dispatch(CreateUserFailed())
            }
        } catch (e) {
            dispatch(CreateUserFailed())
            console.log(e)
        }

    }
}

export const CreateUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const CreateUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

export const FetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL")

            if (res && res.errCode === 0) {

                dispatch(FetchAllUserSuccess(res.users.reverse()))

            } else {
                dispatch(FetchAllUserFailed())
            }
        } catch (e) {
            dispatch(FetchAllUserFailed())
            console.log(e)
        }

    }
}
export const FetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const FetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})
// DELETE USER 

export const DeleteUserStart = (userID) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteUserService(userID)

            if (res && res.errCode === 0) {
                toast.success("Delete user success")

                dispatch(DeleteUserSuccess())
                dispatch(FetchAllUserStart())
            } else {
                toast.warn("Delete user failed")
                dispatch(DeleteUserFailed())
            }
        } catch (e) {
            dispatch(FetchAllUserFailed())
            console.log(e)
        }

    }
}

export const DeleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const DeleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const EditUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await EditUserService(user)
            console.log("check res edit user start", res)
            if (res && res.errCode === 0) {
                toast.success("Edit user success")

                dispatch(EditUserSuccess())
                dispatch(FetchAllUserStart())
            } else {
                toast.warn("Edit user failed")
                dispatch(EditUserFailed())
            }
        } catch (e) {
            dispatch(FetchAllUserFailed())
            console.log(e)
        }

    }
}
export const EditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

export const FetchTopDocTorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService('')
            console.log("check doctor", res)
            if (res && res.errCode === 0) {
                dispatch(FetchTopDocTorSucces(res))
            } else {
                dispatch(FetchTopDocTorFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(FetchTopDocTorFailed())

        }
    }
}

export const FetchTopDocTorSucces = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: data

})

export const FetchTopDocTorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,

})

export const FetchAllDocTorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsDespriptions()
            console.log("check doctor", res)
            if (res && res.errCode === 0) {

                dispatch(FetchAllDocTorSucces({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    data: res.data
                }))
            } else {
                dispatch(FetchTopDocTorFailed({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,

                }))
            }
        } catch (error) {
            console.log(error)
            dispatch(FetchAllDocTorFailed())

        }
    }
}

export const FetchAllDocTorSucces = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: data

})

export const FetchAllDocTorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,

})


export const CreateDoctorStart = (data) => {

    return async (dispatch, getState) => {
        try {
            let res = await CreateNewDoctorSer(data)

            if (res && res.errCode === 0) {
                toast.success("Create a new doctor succes")
                dispatch({
                    type: actionTypes.CREATE_A_NEW_DOCTOR_SUCCESS,
                })


            } else {
                toast.warn("WARING ! Failed")

                dispatch({               
                 type: actionTypes.CREATE_A_NEW_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.warn("WARING ! Failed")

            dispatch({               
                type: actionTypes.CREATE_A_NEW_DOCTOR_FAILED,
               })
               console.log(e)
        }

    }
}

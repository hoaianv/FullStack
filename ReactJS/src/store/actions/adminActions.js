import actionTypes from './actionTypes'
import { getAllCodeService } from '../../services/userService'

// export const FetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// })
// GENDER
export const FetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
             dispatch({type: actionTypes.FETCH_GENDER_START})
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

import actionTypes from './actionTypes'
import { getAllCodeService } from '../../services/userService'

// export const FetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// })

export const FetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("GENDER")
            console.log("check res", res)
            if (res && res.errCode === 0) {
                console.log("check getstate", getState)

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


import { connect } from 'react-redux'
import actionTypes from '../actions/actionTypes'

const initialState = {
  gender: [],
  roles: [],
  position: [],
  isLoadingGender: false
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // GENDER
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true
      return {
        ...state,

      }
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.isLoadingGender = false
      state.gender = action.data
      return {
        ...state,

      }
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false

      return {
        ...state,

      }

      // POSITION
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,

      }
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data
      return {
        ...state,

      }
    case actionTypes.FETCH_POSITION_FAILED:
      state.position = []

      return {
        ...state,

      }
      // ROLE
      case actionTypes.FETCH_ROLE_START:
        return {
          ...state,
  
        }
      case actionTypes.FETCH_ROLE_SUCCESS:
        state.roles = action.data
        return {
          ...state,
  
        }
      case actionTypes.FETCH_ROLE_FAILED:
        state.roles = []
  
        return {
          ...state,
  
        }
    default:
      return state
  }
}


export default adminReducer

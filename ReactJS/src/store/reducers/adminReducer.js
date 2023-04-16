import { connect } from 'react-redux'
import { RECEIVE_INIT_STATE } from 'redux-state-sync'
import actionTypes from '../actions/actionTypes'

const initialState = {
  gender: [],
  roles: [],
  position: [],
  isLoadingGender: false,
  users: [],
  TopDoctors:[]
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
      //user
    case actionTypes.FETCH_ALL_USERS_START:

      return {
        ...state,

      }
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      
      state.users = action.users
      return {
        ...state,

      }

    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = []

      return {
        ...state,

      }

      //Doctors
      case actionTypes.FETCH_TOP_DOCTOR_START:

      return {
        ...state,
    
      }

      case actionTypes.FETCH_TOP_DOCTOR_SUCCESS: 
      state.TopDoctors = action.data
      return {
        ...state,
      }

      case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.TopDoctors = []
      return {
        ...state,
      }

    default:
      return state
  }
 
}


export default adminReducer

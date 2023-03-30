import { connect } from 'react-redux'
import actionTypes from '../actions/actionTypes'

const initialState = {
  gender :[],
   roles:[],
   position:[]
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
        console.log("Draco Vuong fire fetch gender start",action)
      return {
        ...state,
 
      }
      case actionTypes.FETCH_GENDER_SUCCESS:
        console.log("Draco Vuong fire fetch gender success",action)
        let copyState = {...state}
        copyState.gender = action.data
        return {
          ...copyState,
   
        }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log("Draco Vuong fire fetch gender failed",action)

            return {
              ...state,
       
            }
    default:
      return state
  }
}


export default adminReducer

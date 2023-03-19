import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeHeader from './HomeHeader'
import Specialty from '../sectionn/Specialty'

class Home extends Component {
  render() {
   
    return (
      <div>
        <HomeHeader />
        <Specialty/>
        <div style={{height:'300px',width:'300px'}}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

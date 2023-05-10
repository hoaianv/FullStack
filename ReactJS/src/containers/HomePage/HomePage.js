import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeHeader from './HomeHeader'
import Specialty from '../sectionn/Specialty'
import MedicalFacility from '../sectionn/MedicalFacility'
import OutStandingDoctor from '../sectionn/OutStandingDoctor'
import HandBook from '../sectionn/HandBook'
import About from '../sectionn/About'
import Footer from '../sectionn/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss'
class Home extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      
    };

    return (
      <div>
        <HomeHeader isShowBanner = {true} />
        <Specialty settings ={settings} />
        <MedicalFacility settings ={settings} />
        <OutStandingDoctor settings ={settings} />
        <HandBook settings={settings}/>
        <About/>
        <Footer/>


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

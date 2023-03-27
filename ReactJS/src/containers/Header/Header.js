import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LANGUAGES } from '../../utils/constant'
import * as actions from '../../store/actions'
import Navigator from '../../components/Navigator'
import { FormattedMessage } from 'react-intl'
import { adminMenu } from './menuApp'
import './Header.scss'

class Header extends Component {
  changeLanguage =(language)=>{
    this.props.ChangeLanguageAppRedux(language)
  }
  render() {
    const { processLogout,language,userInfo } = this.props
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>


     
     <div className='languages'>
          {/* nút logout */}
          <span className='welcome'>
            <FormattedMessage id={"homeheader.welcome"}/> {userInfo && userInfo.lastName ? userInfo.lastName : " "} !

          </span>

          <span className= {language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}  onClick={()=> this.changeLanguage(LANGUAGES.VI)}>VN</span>
          <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}  onClick={()=> this.changeLanguage(LANGUAGES.EN)}>EN</span>

          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo:state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    ChangeLanguageAppRedux: (language) => dispatch (actions.changeLanguageApp(language))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

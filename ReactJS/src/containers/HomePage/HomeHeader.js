import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import './HomeHeader.scss'
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions'
import { withRouter } from "react-router";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.ChangeLanguageAppRedux(language)
  }
  ReturnToHome = () => {
    if (this.props.history) {
      this.props.history.push('/homepage')
    }
  }
  render() {
    const { language } = this.props

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo" onClick={() => this.ReturnToHome()}></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b><FormattedMessage id={"homeheader.speciality"} /></b>
                </div>
                <div className="subs-title"><FormattedMessage id={"homeheader.searchdoctor"} /></div>
              </div>
              <div className="child-content">
                <div>
                  <b> <FormattedMessage id={"homeheader.health-facility"} />  </b>
                </div>
                <div className="subs-title"><FormattedMessage id={"homeheader.select-room"} /> </div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id={"homeheader.doctor"} /> </b>
                </div>
                <div className="subs-title"><FormattedMessage id={"homeheader.select-doctor"} /> </div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id={"homeheader.fee"} /> </b>
                </div>
                <div className="subs-title"><FormattedMessage id={"homeheader.check-health"} /> </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
              </div>
              <div className="text"><FormattedMessage id={"homeheader.support"} /> </div>
              <div><span className={language === LANGUAGES.EN ? 'flag-vn active' : 'flag-vn'} onClick={() => this.changeLanguage(LANGUAGES.EN)} >EN</span></div>
              <div><span className={language === LANGUAGES.VI ? 'flag-vi active' : 'flag-vi'} onClick={() => this.changeLanguage(LANGUAGES.VI)} >VI</span>
              </div>

            </div>
          </div>
        </div>
        {this.props.isShowBanner === true &&
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1"><FormattedMessage id={"banner.healthcare-platform"} /> </div>
              <div className="title2"><FormattedMessage id={"banner.holistic-healthcare"} /></div>


              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm chuyên khoa khám bệnh"
                />
                {console.log("check banner find :", <FormattedMessage id={"banner.find-a-specialist"} />)}
              </div>
            </div>

            <div className="content-down">
              <div className="options">
                <div className="options-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital-alt"></i>
                  </div>
                  <div className="text-child"> <FormattedMessage id={"banner.specialist-examination"} /></div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child"> <FormattedMessage id={"banner.remote-examination"} /></div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child"> <FormattedMessage id={"banner.General-examination"} /></div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id={"banner.medical-test"} /></div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <i className="fas fa-paint-brush"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id={"banner.dental-examination"} /></div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <i className="far fa-calendar-plus"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id={"banner.surgery-package"} /></div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <i className="fab fa-product-hunt"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id={"banner.medical-products"} /></div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id={"banner.business-health"} /></div>
                </div>
              </div>
            </div>
          </div>}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ChangeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader))

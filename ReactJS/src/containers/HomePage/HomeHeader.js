import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import './HomeHeader.scss'
class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b><FormattedMessage id={"homeheader.speciality"}/></b>
                </div>
                <div className="subs-title"><FormattedMessage  id={"homeheader.searchdoctor"}/></div>
              </div>
              <div className="child-content">
                <div>
                  <b>Cơ sở y tế</b>
                </div>
                <div className="subs-title">Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác sĩ</b>
                </div>
                <div className="subs-title">Tìm bác sĩ giỏi</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Gói khám</b>
                </div>
                <div className="subs-title">Khám sức khỏe tổng quát</div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i class="fas fa-question-circle"></i>
              </div>
              <div className="flag">Hỗ trợ</div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">Nền tảng y tế</div>
            <div className="title2">Chăm sóc sức khỏe toàn diện</div>

            <div className="search">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>

          <div className="content-down">
            <div className="options">
              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child"> Khám chuyên khoa</div>
              </div>
              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-mobile-alt"></i>
                </div>
                <div className="text-child"> Khám từ xa</div>
              </div>
              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-briefcase-medical"></i>
                </div>
                <div className="text-child"> Khám tổng quát</div>
              </div>
              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-user-md"></i>
                </div>
                <div className="text-child">Xét nghiệm y học</div>
              </div>
              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-paint-brush"></i>
                </div>
                <div className="text-child">Khám nha khoa</div>
              </div>
              <div className="options-child">
                <div className="icon-child">
                  <i class="far fa-calendar-plus"></i>
                </div>
                <div className="text-child">Gói phẫu thuật</div>
              </div>
              <div className="options-child">
                <div className="icon-child">
                  <i class="fab fa-product-hunt"></i>
                </div>
                <div className="text-child">Sản phẩm y tế</div>
              </div>
              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-procedures"></i>
                </div>
                <div className="text-child">Sức khỏe doanh nghiệp</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)

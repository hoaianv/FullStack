import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import * as actions from '../../store/actions'
import { handleLoginAPI } from '../../services/userService'

import './Login.scss'
import { FormattedMessage } from 'react-intl'
import { userLoginFail, userLoginSuccess } from '../../store/actions'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isShowPassWord: false,
      errMessage: '',
    }
  }
  handleOnchangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    })
  }
  handleOnchangePassWord = (event) => {
    this.setState({
      password: event.target.value,
    })
  }
  handleLogin = async () => {
    this.setState({
      errMessage: '',
    })

    try {
      let data = await handleLoginAPI(this.state.username, this.state.password)
      console.log('check data', data)
      if (data.errcode === 1) {
        this.setState({
          errMessage: data.message,
        })
      }
      if (data && data.userData.errcode !== 0) {
        this.setState({
          errMessage: data.userData.message,
        })
      }
      if (data && data.userData.errcode === 0) {
        this.props.userLoginSuccess(data.user)
      }
    } catch (error) {
      if (error.response) {
        console.log('check respon:', error.response)
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.userData.errcode,
          })
        }
      }
    }
  }
  handleShowHidePassWord = () => {
    this.setState({
      isShowPassWord: !this.state.isShowPassWord,
    })
  }
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeUserName(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassWord ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnchangePassWord(event)}
                />
                <span onClick={() => this.handleShowHidePassWord()}>
                  <i
                    className={
                      this.state.isShowPassWord
                        ? 'fas fa-eye-slash'
                        : 'fas fa-eye'
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: 'red' }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 ">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12 ">
              <span className="forgot-password">Forgot your Password?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login">Or login with: </span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-facebook facebook"></i>
              <i className="fab fa-google google"></i>
              <i className="fab fa-apple apple"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

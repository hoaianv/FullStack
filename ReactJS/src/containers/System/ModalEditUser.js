import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import '../System/UserManage.scss'
import { emitter } from '../../utils/emitter'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { isEmpty, values } from 'lodash'

class ProductManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    }
  }

  checkValiedInput = () => {
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
    let isValue = true

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false
        alert('Missing parameter: ' + arrInput[i])
        break
      }
    }
    return isValue
  }

  EditUser = () => {
    let isValue = this.checkValiedInput()
    if (isValue === true) {
      this.props.DoEditUser(this.state)
    }
  }
  componentDidMount() {
    let user = this.props.currentUser
    console.log('CHECK DATA PROPS', user)
    if (user && !isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: 'DISABLED',
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      })
    }
  }
  HandleOnChangeInput = (event, id) => {
    let CopyState = { ...this.state }
    CopyState[id] = event.target.value
    this.setState({
      ...CopyState,
    })
  }
  toggle = () => {
    this.props.toggleFromParent()
  }
  render() {
    console.log('check props', this.props)
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.toggle}
          className={'modal-user-container'}
          size="lg"
          centered
        >
          <ModalHeader toggle={this.toggle}>
            <span>Edit user's</span>
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.HandleOnChangeInput(event, 'email')}
                  disabled
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="text"
                  value={this.state.password}
                  onChange={(event) =>
                    this.HandleOnChangeInput(event, 'password')
                  }
                  disabled
                />
              </div>
              <div className="input-container">
                <label>First Name</label>
                <input
                  type="text"
                  value={this.state.firstName}
                  onChange={(event) =>
                    this.HandleOnChangeInput(event, 'firstName')
                  }
                />
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  value={this.state.lastName}
                  onChange={(event) =>
                    this.HandleOnChangeInput(event, 'lastName')
                  }
                />
              </div>
              <div className="input-container max-width-input">
                <label>address</label>
                <input
                  type="text"
                  value={this.state.address}
                  onChange={(event) =>
                    this.HandleOnChangeInput(event, 'address')
                  }
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="px-3"
              color="primary"
              onClick={() => this.EditUser()}
            >
              Save
            </Button>
            <Button className="px-3" color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage)

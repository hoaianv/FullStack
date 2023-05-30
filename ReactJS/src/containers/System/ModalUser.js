import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import '../System/UserManage.scss'
import { emitter } from '../../utils/emitter'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class ProductManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    }
    this.listenToEmitter()
  }

  listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
      })
    })
  }
  componentDidMount() { }
  HandleOnChangeInput = (event, id) => {
    let CopyState = { ...this.state }
    CopyState[id] = event.target.value
    this.setState({
      ...CopyState,
    })
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

  HandleAddNewUser = () => {
    let isValue = this.checkValiedInput()
    if (isValue === true) {
      this.props.CreateNewUser(this.state)
    }
  }

  toggle = () => {
    this.props.toggleFromParent()
  }
  render() {
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
            <span>Create a new user</span>
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.HandleOnChangeInput(event, 'email')}
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
              onClick={() => this.HandleAddNewUser()}
            >
              Save Changes
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

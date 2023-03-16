import React, { Component } from 'react'
import { connect, useSelector } from 'react-redux'
import '../System/UserManage.scss'
import {
  getAllUsers,
  CreateNewUserService,
  DeleteUserService,
  EditUserService,
} from '../../services/userService'
import { emitter } from '../../utils/emitter'
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'
class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      currentUser: [],
    }
  }

  async componentDidMount() {
    await this.getAllUserFromReact()
  }

  getAllUserFromReact = async () => {
    let response = await getAllUsers('ALL')
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      })
      emitter.emit('EVENT_CLEAR_MODAL_DATA')
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    })
  }
  HandleEditUser = (user) => {
    console.log('check user edit:', user)
    this.setState({
      isOpenModalEditUser: true,
      currentUser: user,
    })
  }
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    })
  }
  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    })
  }
  CreateNewUser = async (data) => {
    try {
      let response = await CreateNewUserService(data)
      if (response && response.errCode !== 0) {
        alert(response.message)
      } else {
        await this.getAllUserFromReact()
        this.setState({
          isOpenModalUser: !this.state.isOpenModalUser,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  DoEditUser = async (data) => {
    try {
      let response = await EditUserService(data)
      if (response && response.errCode !== 0) {
        alert(response.message)
      } else {
        await this.getAllUserFromReact()
        this.setState({
          isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  HandleDeleteUser = async (user) => {
    console.log('check user delete ', user.id)
    try {
      let response = await DeleteUserService(user.id)
      console.log('check response', response)
      if (response.errCode === 0) {
        await this.getAllUserFromReact()
      } else {
        alert(response.message)
      }
    } catch (error) {}
  }
  render() {
    let arrUsers = this.state.arrUsers
    return (
      <div className="users-container">
        <div className="title text-center"> Manage users with Draco</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3 ml-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i style={{ marginRight: '5px' }} className="fas fa-user-plus "></i>{' '}
            Add new user
          </button>
        </div>

        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          CreateNewUser={this.CreateNewUser}
        ></ModalUser>
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleEditUserModal}
            currentUser={this.state.currentUser}
            DoEditUser={this.DoEditUser}
          ></ModalEditUser>
        )}

        <div className="users-table mt">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.HandleEditUser(item)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.HandleDeleteUser(item)}
                        >
                          <i className="fas fa-user-times"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)

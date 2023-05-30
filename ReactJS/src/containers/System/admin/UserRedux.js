import React, { Component } from 'react'
import FsLightbox from "fslightbox-react";
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { CommonUtils } from '../../../utils'
import { LANGUAGES, CRUD_ACTION } from '../../../utils/constant'
import * as actions from '../../../store/actions'
import TableManageUser from './TableManageUser';
import './UserRedux.scss'
class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: '',
      isOpen: false,


      Email: '',
      PassWord: '',
      FirstName: '',
      LastName: '',
      NumberPhone: '',
      Address: '',
      Gender: '',
      Position: '',
      Role: '',
      avatar: '',


      action: "",
      userID: ""
    }
  }

  async componentDidMount() {
    this.props.getGenderStart()
    this.props.getPostionStart()
    this.props.getRoleStart()
    //  this.props.dispatch(actions.FetchGenderStart())
    //   try {
    //     let res = await getAllCodeService("gender")
    //     if (res && res.errCode === 0) {
    //       this.setState({
    //         genderArr: res.data
    //       })
    //     }
    //   } catch (error) {

    //   }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let arrGender = this.props.genderRedux
    let arrPosition = this.props.positionRedux
    let arrRole = this.props.roleRedux

    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux
      this.setState({
        genderArr: arrGender,
        Gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''

      })
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux
      this.setState({
        positionArr: arrPosition,
        Position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
      })
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux
      this.setState({
        roleArr: arrRole,
        Role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
      })
    }
    if (prevProps.ListUserRedux !== this.props.ListUserRedux) {
      this.setState({

        Email: '',
        PassWord: '',
        FirstName: '',
        LastName: '',
        NumberPhone: '',
        Address: '',
        Gender: '',
        Position: '',
        Role: '',
        previewImgURL: '',
        Gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
        Position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
        Role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
        action: CRUD_ACTION.CREATE




      })
    }
  }
  HandleOnChangeImg = async (event) => {
    let data = event.target.files
    let file = data[0]
    if (file) {
      let objURL = URL.createObjectURL(file)
      let fileBase64 = await CommonUtils.toBase64(file)
      this.setState({
        previewImgURL: objURL,
        avatar: fileBase64
      })
    }
  }
  OpenPreviewIMG = () => {
    if (!this.state.previewImgURL) return
    this.setState({
      isOpen: true
    })
  }

  onChangeInput = (event, id) => {

    let copyState = { ...this.state }
    copyState[id] = event.target.value
    this.setState({
      ...copyState
    })
  }

  // checkValidateInput = () =>{
  //   let isValid = true

  //   let checkArr = ['Email','PassWord','FirstName','LastName','NumberPhone','Address']
  //   for(let i = 0; i <checkArr.length;i++){
  //     if(!this.state[checkArr[i]]){
  //       isValid = false
  //       alert("This input is required  "+ checkArr[i])
  //       break
  //     }

  //   }
  //   return isValid

  // }

  checkValidateInput = () => {
    let isValid = true

    let checkNumber = /^[0-9\b]+$/
    let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/
    let checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let checkArr = ['Email', 'PassWord', 'FirstName', 'LastName', 'NumberPhone', 'Address']
    for (let i = 0; i < checkArr.length; i++) {
      if (!this.state[checkArr[i]]) {
        isValid = false
        toast.warn("This input is required " + checkArr[i].toLocaleLowerCase())
        break
      } else {
        if (i === 0) {
          if (!checkEmail.test(this.state[checkArr[i]])) {
            toast.warn("You are writing invalid email address!")

            isValid = false
            break
          }
        }

        if (i === 1) {
          if (!checkPassword.test(this.state[checkArr[i]])) {
            toast.warn("Password must be at least one uppercase, one lowercase, one special character and one number.")

            isValid = false
            break
          }
        }
        if (i === 4) {
          if (!checkNumber.test(this.state[checkArr[i]])) {
            toast.warn("This input is number ")
            isValid = false
            break
          }
        }


      }

    }
    return isValid

  }

  HandleSaveUser = () => {
    let Isvalid = this.checkValidateInput()

    if (Isvalid === false) return
    if (this.state.action === CRUD_ACTION.CREATE) {
      this.props.createNewUser({
        email: this.state.Email,
        password: this.state.PassWord,
        firstName: this.state.FirstName,
        lastName: this.state.LastName,
        address: this.state.Address,
        numberphone: this.state.NumberPhone,
        gender: this.state.Gender,
        roleId: this.state.Role,
        positionId: this.state.Position,
        avatar: this.state.avatar
      })
      console.log("check state avatar", this.state)
    }
    if (this.state.action === CRUD_ACTION.EDIT) {
      this.props.editUser({
        id: this.state.userID,

        firstName: this.state.FirstName,
        lastName: this.state.LastName,
        address: this.state.Address,
        numberphone: this.state.NumberPhone,
        gender: this.state.Gender,
        roleId: this.state.Role,
        positionId: this.state.Position,
        avatar: this.state.avatar

      })
    }



  }
  HandleEditUserParent = (user) => {
    console.log("check edit user parent", user)
    let imageBase64 = ''
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary")
    }


    this.setState({

      Email: user.email,
      PassWord: 'Hoaian@123',
      FirstName: user.firstName,
      LastName: user.lastName,
      NumberPhone: user.numberphone,
      Address: user.address,
      // Gender: user.gender,
      // Position: '',
      // Role: '',
      avatar: '',
      previewImgURL: imageBase64,
      Gender: user.gender,
      Position: user.positionId,
      Role: user.roleId,
      action: CRUD_ACTION.EDIT,
      userID: user.id


    })
  }
  render() {

    // Email:'',
    //   PassWord:'',
    //   FirstName:'',
    //   LastName:'',
    //   NumberPhone:'',
    //   Address:'',
    //   Gender:'',
    //   Position:'',
    //   Role:'',
    //   avatar:''

    let { Email, PassWord, FirstName, LastName, NumberPhone, Address, Gender, Position, Role, avatar } = this.state



    // const {toggler} = this.state.isOpen
    let gender = this.state.genderArr
    let position = this.state.positionArr
    let role = this.state.roleArr
    let Language = this.props.Language
    let isGetGender = this.props.isLoadingGender

    return <div className="user-container-redux">
      <div className='title'>
        Learn CRUD-REDUX with Draco V
      </div>
      <div>{isGetGender === true ? "Loading gender" : ""}</div>
      <div className='user-redux-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h1><FormattedMessage id={'manage-user.add-new-user'} /></h1>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.email'} /></label>
              <input className='form-control' type='input'
                value={Email} onChange={(event) => { this.onChangeInput(event, 'Email') }}
                disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
              ></input>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.password'} /></label>
              <input className='form-control' type='password' value={PassWord} onChange={(event) => { this.onChangeInput(event, 'PassWord') }}
                disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}

              ></input>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.first-name'} /></label>
              <input className='form-control' type='input' value={FirstName} onChange={(event) => { this.onChangeInput(event, 'FirstName') }}></input>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.last-name'} /></label>
              <input className='form-control' type='input'
                value={LastName} onChange={(event) => { this.onChangeInput(event, 'LastName') }}
              ></input>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.number-phone'} /></label>
              <input className='form-control' type='input'
                value={NumberPhone} onChange={(event) => { this.onChangeInput(event, 'NumberPhone') }}

              ></input>
            </div>
            <div className='col-9'>
              <label><FormattedMessage id={'manage-user.address'} /></label>
              <input className='form-control' type='input'

                value={Address} onChange={(event) => { this.onChangeInput(event, 'Address') }}

              ></input>
            </div>
            <div className="form-group col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.gender'} /></label>
              <select id="inputState" className="form-control"
                value={Gender}
                onChange={(event) => { this.onChangeInput(event, 'Gender') }}

              >
                {gender && gender.length > 0 && gender.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>{Language === LANGUAGES.VI ? item.valueVi : item.valueVn}</option>
                  )
                })

                }
              </select>
            </div>
            <div className="form-group col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.position'} /></label>
              <select id="inputState" className="form-control"
                value={Position}
                onChange={(event) => { this.onChangeInput(event, 'Position') }}

              >
                {position && position.length > 0 && position.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>{Language === LANGUAGES.VI ? item.valueVi : item.valueVn}</option>
                  )
                })}

              </select>
            </div>
            <div className="form-group col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.role'} /></label>
              <select id="inputState" className="form-control"
                value={Role}

                onChange={(event) => { this.onChangeInput(event, 'Role') }}

              >
                {role && role.length > 0 && role.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>{Language === LANGUAGES.VI ? item.valueVi : item.valueVn}</option>
                  )
                })}
              </select>
            </div>
            <div className=" col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.image'} />
                <div className='preview-img-container'>
                  <input id='previewIMG' type='file' hidden onChange={(event) => { this.HandleOnChangeImg(event) }} />
                  <label className='label-upload' htmlFor='previewIMG'>TẢI ẢNH <i class="fas fa-chevron-circle-up"></i>  </label>
                  <div className='privew-img'
                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }} onClick={() => this.OpenPreviewIMG()}></div>
                </div>


              </label>

            </div>
            <div className='col-12'>
              <button type="submit" className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"} onClick={() => this.HandleSaveUser()}>
                {this.state.action === CRUD_ACTION.EDIT ? <FormattedMessage id={'manage-user.edit'} /> : <FormattedMessage id={'manage-user.save'} />}

              </button>
            </div>
            <div className='col-12'>
              <TableManageUser
                HandleEditUserParent={this.HandleEditUserParent}
              />

            </div>
          </div>
        </div>
      </div>

      {this.state.isOpen === false ?
        <FsLightbox
          toggler={false}
        /> :
        <FsLightbox
          toggler={true}
          sources={[
            this.state.previewImgURL
          ]} />
      }
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    Language: state.app.language,
    genderRedux: state.admin.gender,
    positionRedux: state.admin.position,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
    ListUserRedux: state.admin.users

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.FetchGenderStart()),
    getPostionStart: () => dispatch(actions.FetchPositionStart()),
    getRoleStart: () => dispatch(actions.FetchRoleStart()),
    createNewUser: (data) => dispatch(actions.CreateUserStart(data)),
    getAllUserStart: () => dispatch(actions.FetchAllUserStart()),
    editUser: (data) => dispatch(actions.EditUserStart(data))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)

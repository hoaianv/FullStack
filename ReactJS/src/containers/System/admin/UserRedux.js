import React, { Component } from 'react'
import FsLightbox from "fslightbox-react";

import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { LANGUAGES } from '../../../utils/constant'
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
      Avatar: ''
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
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux
      this.setState({
        genderArr: arrGender,
        Gender:arrGender && arrGender.length > 0 ? arrGender[0].key : ''

      })
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux
      this.setState({
        positionArr: arrPosition,
        Position:arrPosition && arrPosition.length>0 ? arrPosition[0].key:''
      })
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux
      this.setState({
        roleArr:  arrRole,
        Role:arrRole &&  arrRole.length>0 ? arrRole[0].key :''
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
        Avatar: ''
            })
  }
  }
  HandleOnChangeImg = (event) => {
    let data = event.target.files
    let file = data[0]
    if (file) {
      let objURL = URL.createObjectURL(file)
      this.setState({
        previewImgURL: objURL,
        Avatar: file
      })
    }
  }
  OpenPreviewIMG = () => {
    if (!this.state.previewImgURL) return
    this.setState({
      isOpen: true
    })
  }

  onChangeInput = (event,id)=>{

    let copyState = {...this.state}
    copyState[id]= event.target.value
    this.setState({
      ...copyState
    } )
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

    checkValidateInput = () =>{
    let isValid = true
    
    let checkNumber = /^[0-9\b]+$/  
    let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/
    let checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let checkArr = ['Email','PassWord','FirstName','LastName','NumberPhone','Address']
    for(let i = 0; i <checkArr.length;i++){
      if(!this.state[checkArr[i]]){
        isValid = false
        alert("This input is required  "+ checkArr[i])
        break
      }else{ 
        if(i===0){
          if(!checkEmail.test(this.state[checkArr[i]])){
            alert("You are writing invalid email address!")
            isValid = false
            break
          }
        }

        if(i===1){ 
          if(!checkPassword.test(this.state[checkArr[i]])){
            alert("Password must be at least one uppercase, one lowercase, one special character and one number." )
            isValid = false
            break
          }
        }
        if(i===4){
          if(!checkNumber.test(this.state[checkArr[i]])){
            alert("This input is number ")
            isValid = false
            break
          }
        }

         
      }
 
    }
    return isValid

  }

  HandleSaveUser = ()=> {
    let Isvalid =   this.checkValidateInput()

     if(Isvalid === false) return

     this.props.createNewUser({
      email: this.state.Email,
      password: this.state.PassWord,
      firstName: this.state.FirstName,
      lastName: this.state.LastName,
      address: this.state.Address,
      numberphone: this.state.NumberPhone,
      gender: this.state.Gender ,
      roleId: this.state.Role,
      positionId: this.state.Position,


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
    //   Avatar:''

    let { Email, PassWord, FirstName, LastName, NumberPhone, Address, Gender, Position, Role, Avatar } = this.state



    console.log("check isOpen", this.state.isOpen)
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
              ></input>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.password'} /></label>
              <input className='form-control' type='password' value={PassWord} onChange={(event) => { this.onChangeInput(event, 'PassWord') }}></input>
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
              onChange={(event) => { this.onChangeInput(event, 'Gender') }}

              >
                {gender && gender.length > 0 && gender.map((item, index) => {
                  return (
                    <option key={index} value={item.key}>{Language === LANGUAGES.VI ? item.valueVi : item.valueVn}</option>
                  )
                })

                }
              </select>
            </div>
            <div className="form-group col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.position'} /></label>
              <select id="inputState" className="form-control"
              
              onChange={(event) => { this.onChangeInput(event, 'Position') }}

              >
                {position && position.length > 0 && position.map((item, index) => {
                  return (
                    <option key={index} value={item.key}>{Language === LANGUAGES.VI ? item.valueVi : item.valueVn}</option>
                  )
                })}

              </select>
            </div>
            <div className="form-group col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.role'} /></label>
              <select id="inputState" className="form-control" 
              
              onChange={(event) => { this.onChangeInput(event, 'Role') }}

              >
                {role && role.length > 0 && role.map((item, index) => {
                  return (
                    <option key={index} value={item.key}>{Language === LANGUAGES.VI ? item.valueVi : item.valueVn}</option>
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
              <button type="submit" className="btn btn-primary" onClick={() => this.HandleSaveUser()}><FormattedMessage id={'manage-user.save'} /></button>
            </div>
            <div className='col-12'> 
             <TableManageUser/>

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
    getAllUserStart: () => dispatch(actions.FetchAllUserStart())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)

import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { LANGUAGES } from '../../../utils/constant'
import { getAllCodeService } from '../../../services/userService'
import * as actions from'../../../store/actions'
import { isConstructorDeclaration } from 'typescript'
class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: []
    }
  }

  async componentDidMount() {
     this.props.getGenderStart()
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
  componentDidUpdate(prevProps, prevState, snapshot){
if( prevProps.genderRedux!== this.props.genderRedux){
  this.setState({
    genderArr: this.props.genderRedux
  })
}
}
  render() {
    let gender = this.state.genderArr
    let Language = this.props.Language
   

    return <div className="user-container-redux">
      <div className='title'>
        Learn CRUD-REDUX with Draco V
      </div>

      <div className='user-redux-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h1><FormattedMessage id={'manage-user.add-new-user'} /></h1>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.email'} /></label>
              <input className='form-control' type='input'></input>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.password'} /></label>
              <input className='form-control' type='input'></input>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.first-name'} /></label>
              <input className='form-control' type='input'></input>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.last-name'} /></label>
              <input className='form-control' type='input'></input>
            </div>
            <div className='col-3'>
              <label><FormattedMessage id={'manage-user.number-phone'} /></label>
              <input className='form-control' type='input'></input>
            </div>
            <div className='col-9'>
              <label><FormattedMessage id={'manage-user.address'} /></label>
              <input className='form-control' type='input'></input>
            </div>
            <div className="form-group col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.gender'} /></label>
              <select id="inputState" className="form-control">
                {gender && gender.length > 0 && gender.map((item, index) => {
                  return (
                    <option key={index}>{Language === LANGUAGES.VI ? item.valueVi : item.valueVn}</option>
                  )
                })

                }
              </select>
            </div>
            <div className="form-group col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.position'} /></label>
              <select id="inputState" className="form-control">


                <option select>Choose...</option>
              </select>
            </div>
            <div className="form-group col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.role'} /></label>
              <select id="inputState" className="form-control">
                <option select>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="form-group col-3">
              <label for="inputState"><FormattedMessage id={'manage-user.image'} /></label>
              <select id="inputState" className="form-control">
                <option select>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className='col-12'>
              <button type="submit" className="btn btn-primary"><FormattedMessage id={'manage-user.save'} /></button>
            </div>
          </div>
        </div>
      </div>


    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    Language: state.app.Language,
    genderRedux: state.admin.gender
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.FetchGenderStart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeHeader from '../../HomePage/HomeHeader'
import './DetailDoctor.scss' 
import {GetDetailInforDoctor} from '../../../services/userService'

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
          InforDoctor:{}
        }
    }
 async componentDidMount(){
      if(this.props.match && this.props.match.params && this.props.match.params.id){
        let id = this.props.match.params.id
        let res = await GetDetailInforDoctor(id)
        if(res && res.errCode === 0) {
            this.setState({
                InforDoctor : res.data
            })
        }
      }
 }

 componentDidUpdate(prevProps, prevState, snapshot) {
  
}
    render() {
            let{InforDoctor} = this.state
            let nameVi='' , nameEn =''
             nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}`
             nameEn = `${item.positionData.valueVn},${item.lastName} ${item.firstName}`
            console.log("check infor doctor",InforDoctor)
          return (
            <>
                <div>
                    <HomeHeader isShowBanner={false} />
                </div>
                <div className='Doctor-detail-container'>
                   <div className='intro-doctor'>
                         <div className='content-left' style={ {
                                backgroundImage: `url(${ InforDoctor && InforDoctor.image ? InforDoctor.image : " " })`
                            }}>

                         </div>
                         <div className='content-right'>
                            <div className='up' >
                                Tien si Vuong Hoai An
                            </div>
                            <div className='down'>
                                {
                                    InforDoctor && InforDoctor.MarkDown &&  InforDoctor.MarkDown.description &&
                                    <span>{InforDoctor.MarkDown.description}</span>
                                }
                            </div>
                         </div>
                   </div>
                   <div className='schedule-doctor'>

                   </div>
                   <div className='detail-infor-doctors'>

                   </div>
                   <div className='comment-doctor'>

                   </div>
                </div>

            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)

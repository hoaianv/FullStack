import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeHeader from '../../HomePage/HomeHeader'
import './DetailDoctor.scss' 
import {GetDetailInforDoctor} from '../../../services/userService'
import { LANGUAGES } from '../../../utils/constant'
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
            let language = this.props.lang

            let nameVi='' , nameEn =''
            console.log("check infor doctor",InforDoctor)
            if(InforDoctor && InforDoctor.positionData){
                nameVi = `${InforDoctor.positionData.valueVi},${InforDoctor.lastName} ${InforDoctor.firstName}`
                nameEn = `${InforDoctor.positionData.valueVn},${InforDoctor.firstName} ${InforDoctor.lastName}`
            }
                 

    
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
                                {language === LANGUAGES.VI ? nameVi : nameEn}
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
                    { InforDoctor && InforDoctor.MarkDown && InforDoctor.MarkDown.contentHTML&&
                    
              <div dangerouslySetInnerHTML={{__html: InforDoctor.MarkDown.contentHTML}}></div>
                    }

                   </div>
                   <div className='comment-doctor'>

                   </div>
                </div>

            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)

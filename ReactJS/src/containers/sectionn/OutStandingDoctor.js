import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Slider from "react-slick";
import * as actions from '../../store/actions'
import {LANGUAGES} from '../../utils/constant'
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.DoctorRedux !== this.props.DoctorRedux) {
            this.setState({
                arrDoctor: this.props.DoctorRedux
            })
        }
    }
    HandleDetailDoctor = (doctor) => {
        console.log("check doctor",doctor)
        this.props.history.push(`/detail-doctors/${doctor.id}`)
    }
    componentDidMount() {
        this.props.loadTopDoctor()
    }
    render() {
        let arrDoctors = this.state.arrDoctor
        let language = this.props.lang
        console.log("check arrDoctors",arrDoctors)

         return (
            <div className='section-share section-outstanding-doctor '>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>
                            Xem thêm
                        </button>
                    </div>
                    <div className='section-body'> 
                        <Slider {...this.props.settings}>
                            {arrDoctors.data && arrDoctors.data.length > 0 && arrDoctors.data.map((item, index) => {
                                let imageBase64 = ''
                                if(item.image){
                                 imageBase64 = new Buffer(item.image,"base64").toString("binary")
                                }
                             

                                let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueVn},${item.lastName} ${item.firstName}`
                            

                                return (
                                    <div className='section-customize' key={index} onClick={() => this.HandleDetailDoctor(item)}   >
                                        <div className='customize-boder'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-outstanding-doctor '
                                                style={{backgroundImage:`url(${imageBase64})`}}
                                                ></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn} </div>
                                                <div>Da liễu</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        DoctorRedux: state.admin.TopDoctors,
        lang: state.app.language,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // ChangeLanguageAppRedux: (language) => dispatch (changeLanguageApp(language))
        loadTopDoctor: () => dispatch(actions.FetchTopDocTorStart())

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor))

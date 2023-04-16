import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Slider from "react-slick";
import * as actions from '../../store/actions'

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
    componentDidMount() {
        this.props.loadTopDoctor()
    }
    render() {
        let arrDoctors = this.state.arrDoctor
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
                                return (
                                    <div className='section-customize' key={index}>
                                        <div className='customize-boder'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-outstanding-doctor'></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div>Phó Giáo sư,Tiến sĩ,Bác sĩ cao câp Draco Vuong </div>
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
        DoctorRedux: state.admin.TopDoctors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // ChangeLanguageAppRedux: (language) => dispatch (changeLanguageApp(language))
        loadTopDoctor: () => dispatch(actions.FetchTopDocTorStart())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)

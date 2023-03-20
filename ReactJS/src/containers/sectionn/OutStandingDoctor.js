import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Slider from "react-slick";


class OutStandingDoctor extends Component {
  render() {
   
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
                    <div className='section-customize'>
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
                    <div className='section-customize'>
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

                    <div className='section-customize'>
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

                    <div className='section-customize'>
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

                    <div className='section-customize'>
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

                    <div className='section-customize'>
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



                    
                </Slider>
                </div>
            </div>
        </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)

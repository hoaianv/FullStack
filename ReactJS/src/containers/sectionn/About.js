import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class HandBook extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Thanh Phuong number one :33
                </div>

                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe width="100%" height="300px"
                        src="https://www.youtube.com/embed/JZjAg6fK-BQ?list=RDJZjAg6fK-BQ"
                        title="The Weeknd - Reminder (Official Video)"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
<p>Abel Makkonen Tesfaye là nam ca sĩ, nhạc sĩ, nhà sản xuất thu âm người Canada. 
Anh sinh ra tại thành phố Toronto và lớn lên ở Scarborough. Tesfaye bắt đầu sáng tác 
âm nhạc vào năm 2009 bằng cách đăng tải một cách vô danh bài hát "Do It" lên trang mạng YouTube.</p>
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
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HandBook)

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class HandBook extends Component {

    render() {
            return (
            <div className='home-footer'>
          <p>&copy; 2023 Draco Vuong. More information, please visit my Facebook.
            <a href='https://www.facebook.com/profile.php?id=100021956558295'> 	&rarr;</a>

             </p>
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

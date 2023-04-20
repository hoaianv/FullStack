import React, { Component } from 'react'
import { connect } from 'react-redux'
import './TableManageUser.scss'
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
  }
class TableManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listUser: []
        }
    }



    async componentDidMount() {
        this.props.getAllUserStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.ListUserRedux !== this.props.ListUserRedux) {
            this.setState({
                listUser: this.props.ListUserRedux
            })
        }
    }
    HandleDeleteUser = (UserId) => {
        this.props.deleteUserStart(UserId)
    }
    HandleEditUser = (User) => {
        this.props.HandleEditUserParent(User)
    }
    render() {

        let listUser = this.state.listUser
        console.log("check listUser state", listUser)
        return (
            <React.Fragment>
                <div className="users-container">

                    <div className="users-table mt">
                        <table id="TableManageUser">
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                                {listUser && listUser.length > 0 && listUser.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => this.HandleEditUser(item)}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.HandleDeleteUser(item.id)}
                                                >
                                                    <i className="fas fa-user-times"></i>
                                                </button>
                                            </td>
                                        </tr>

                                    )
                                })


                                }



                            </tbody>
                        </table>
                    </div>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange}  />

            </React.Fragment>



        )
    }
}

const mapStateToProps = (state) => {
    return {
        ListUserRedux: state.admin.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getGenderStart: () => dispatch(actions.FetchGenderStart()),
        getAllUserStart: () => dispatch(actions.FetchAllUserStart()),
        deleteUserStart: (id) => dispatch(actions.DeleteUserStart(id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser)

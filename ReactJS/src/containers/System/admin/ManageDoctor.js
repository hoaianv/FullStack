import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTION } from '../../../utils/constant'

import { GetDetailInforDoctor } from '../../../services/userService'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: '',
            contentMarkDown: '',
            contentHTML: '',
            description: '',
            oldHasData: false,
            listDoctors: []
        }
    }



    async componentDidMount() {
        this.props.FetchAllDocTorStart()
    }

    HandleSaveContentMarkDown = () => {
        let { oldHasData } = this.state

        this.props.CreateNewDoctorDetail({
            contentHTML: this.state.contentHTML,
            contentMarkDown: this.state.contentMarkDown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: oldHasData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE

        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctors.data !== this.props.AllDoctors.data) {
            let selectData = this.buildDataInputSelect(this.props.AllDoctors.data)
            console.log("check select", selectData)
            this.setState({
                listDoctors: selectData
            })
        }
        if (prevProps.language !== this.props.language) {
            let selectData = this.buildDataInputSelect(this.props.AllDoctors.data)
            console.log("check select", selectData)
            this.setState({
                listDoctors: selectData
            })
        }
    }
    HandleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleEditorChange = ({ html, text }) => {

        this.setState({
            contentMarkDown: text,
            contentHTML: html
        })
    }
    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let response = await GetDetailInforDoctor(selectedDoctor.value)
        console.log("check response", response)
        if (response && response.data && response.data.MarkDown) {
            let markdown = response.data.MarkDown
            this.setState({
                contentMarkDown: markdown.contentMarkDown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                oldHasData: true

            })
        } else {
            this.setState({
                contentMarkDown: '',
                contentHTML: '',
                description: '',
                oldHasData: false


            })
        }

    }

    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {}

                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = item.id

                result.push(obj)

            })
        }
        return result

    }

    render() {
        let { oldHasData } = this.state
        return (
            <div className='manage-doctor-container'>


                <div className='manage-doctor-title'>Manage Doctor</div>
                <div className='more-info'>
                    <div className='content-left form-group'>

                        <label>Chọn bác sĩ:</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows='4' value={this.state.description} onChange={(event) => this.HandleOnChangeDesc(event)}>
                        </textarea>
                    </div>

                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkDown}
                        Ï />
                    <button className={oldHasData === true ? 'save-content-doctor' : 'create-content-doctor'} onClick={() => this.HandleSaveContentMarkDown()}>
                        {oldHasData === true ?
                            <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                        }
                    </button>
                </div>


            </div>





        )
    }
}

const mapStateToProps = (state) => {
    return {
        AllDoctors: state.admin.AllDoctors,
        language: state.app.language,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        FetchAllDocTorStart: (id) => dispatch(actions.FetchAllDocTorStart()),
        CreateNewDoctorDetail: (data) => dispatch(actions.CreateDoctorStart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)

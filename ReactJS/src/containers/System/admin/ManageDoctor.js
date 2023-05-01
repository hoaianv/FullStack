import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

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
            listDoctors:[]
        }
    }



    async componentDidMount() {
        this.props.FetchAllDocTorStart()
    }

    HandleSaveContentMarkDown = () => {

  this.props.CreateNewDoctorDetail({
    contentHTML: this.state.contentHTML,
    contentMarkDown: this.state.contentMarkDown,
    description: this.state.description,
    doctorId: this.state.selectedDoctor.value

  })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctors.data !== this.props.AllDoctors.data    ) {
            let selectData = this.buildDataInputSelect(this.props.AllDoctors.data)
            console.log("check select",selectData)
            this.setState({
                listDoctors: selectData
            })
        }
        if(prevProps.language !== this.props.language){
            let selectData = this.buildDataInputSelect(this.props.AllDoctors.data)
            console.log("check select",selectData)
            this.setState({
                listDoctors: selectData
            })
        }
    }
    HandleOnChangeDesc = (event) =>{
        this.setState({
            description : event.target.value
        })
    }

    handleEditorChange = ({ html, text }) => {

        this.setState({
            contentMarkDown: text,
            contentHTML: html
        })
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    }

    buildDataInputSelect  =(inputData)  =>{
        let result = []
        let {language} = this.props
        if(inputData && inputData.length >0){
            inputData.map((item,index)=>{
              let obj ={}
              
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
        console.log("check all doc tor",this.props.AllDoctors.data)
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
                        <textarea className='form-control' rows='4' value={this.state.description} onChange={(event) => this.HandleOnChangeDesc(event) }>
                        </textarea>
                    </div>

                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        Ï />
                    <button className='save-content-doctor' onClick={() => this.HandleSaveContentMarkDown()}>
                        Lưu thông tin
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

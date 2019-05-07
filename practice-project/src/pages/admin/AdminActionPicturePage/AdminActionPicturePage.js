import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout, Radio, Select, Upload, message, Button, Icon } from 'antd';


import { actAddPictureRequest, actGetPictureRequest, actUpdatePictureRequest } from '../../../actions/index';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const props = {
  name: 'file',
  action: 'http://api.imgur.com/3/image',
  headers: {
    Authorization: '6792ecf3f0f58b1 9e8f9d3c9db930bfbdbb16f9fe5318f3438e7e19',
    'Cache-Control': '',
    'X-Requested-With': '',
    'Access-Control-Allow-Headers': '*'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log(info);

    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class AdminAddPicturePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      txtName: '',
      txtLink: '',
      arrTags: [],
      radioStatus: '0',
    }
  }

  componentDidMount() {
    const { match } = this.props;

    if (match) {
      let id = match.params.id;
      this.props.onGetPicture(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditing) {
      const { itemEditing } = nextProps;
      this.setState({
        id: itemEditing.id,
        txtName: itemEditing.name,
        txtLink: itemEditing.link,
        arrTags: itemEditing.tags,
        radioStatus: itemEditing.status
      })
    }
  }

  onSave = (e) => {
    e.preventDefault();

    let { id, txtName, txtLink, arrTags, radioStatus } = this.state;
    let { history } = this.props;
    let picture = {
      id: id,
      name: txtName,
      link: txtLink,
      tags: arrTags,
      status: radioStatus
    }
    
    if (id) {
      this.props.onUpdatePicture(picture);
      history.goBack();
    } else {
      this.props.onAddPicture(picture);
      history.goBack();
    }
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    })
  }
  
  handleChange = (value) => {
    this.setState({
      arrTags: value
    })
  }

  render() {
    let { id, txtName, txtLink, radioStatus, arrTags } = this.state;
    const title = id ? 'Update Picture' : 'Add Picture';
    const children = [];

    return (
      <Layout style={{width: "1140px", margin: "auto", background: "none", marginTop: "50px"}}>
        <h2 className="text-center mb-5">{ title }</h2>
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label htmlFor="pictureName">Picture Name:</label>
            <input 
              type="text" 
              className="form-control" 
              id="pictureName" 
              placeholder="Enter name" 
              name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pictureLink">Picture Link:</label>
            <input 
              type="text" 
              className="form-control" 
              id="pictureLink" 
              placeholder="Enter Link" 
              name="txtLink"
              value={txtLink}
              onChange={this.onChange}
            />
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </div>
          <div className="form-group">
            <label htmlFor="pictureTags">Picture Tags:</label>
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Tags Mode"
              onChange={this.handleChange}
              name="arrTags"
              value={arrTags}
            >
              {children}
            </Select>
          </div>
          <div className="form-group">
            <label className="mr-5" htmlFor="pictureStatus">Picture Status:</label>
            <RadioGroup 
              id="pictureStatus" 
              name="radioStatus"
              value={radioStatus}
              onChange={this.onChange} 
            >
              <RadioButton value="0">Private</RadioButton>
              <RadioButton value="1">New</RadioButton>
              <RadioButton value="2">Feature</RadioButton>
            </RadioGroup>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary mr-2 px-5">Submit</button>
            <NavLink to="/admin/picture-list" className="btn btn-danger px-5">Back</NavLink></div>
        </form>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    itemEditing: state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddPicture: (picture) => {
      dispatch(actAddPictureRequest(picture));
    },
    onGetPicture: (id) => {
      dispatch(actGetPictureRequest(id));
    },
    onUpdatePicture: (picture) => {
      dispatch(actUpdatePictureRequest(picture));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddPicturePage);
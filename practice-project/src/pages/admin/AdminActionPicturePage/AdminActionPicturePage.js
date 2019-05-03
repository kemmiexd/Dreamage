import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Radio, Select } from 'antd';


import { actAddPictureRequest, actGetPictureRequest, actUpdatePictureRequest } from '../../../actions/index';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AdminAddPicturePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      txtName: '',
      txtLink: '',
      txtTags: [],
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
        txtTags: itemEditing.tags,
        radioStatus: itemEditing.status
      })
    }
  }

  onSave = (e) => {
    e.preventDefault();

    let { id, txtName, txtLink, txtTags, radioStatus } = this.state;
    let { history } = this.props;
    let picture = {
      id: id,
      name: txtName,
      link: txtLink,
      tags: txtTags,
      status: radioStatus
    }
    console.log(txtTags);
    
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
      txtTags: value
    })
  }

  render() {
    let { id, txtName, txtLink, radioStatus, txtTags } = this.state;
    const title = id ? 'Update Picture' : 'Add Picture';
    const children = [];

    return (
      <Fragment>
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
          </div>
          <div className="form-group">
            <label htmlFor="pictureTags">Picture Tags:</label>
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Tags Mode"
              onChange={this.handleChange}
              name="txtTags"
              value={txtTags}
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
      </Fragment>
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
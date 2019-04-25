import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Radio } from 'antd';

import { actAddPictureRequest } from '../../../actions/index';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AdminAddPicturePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      txtName: '',
      txtLink: '',
      txtTags: '',
      radioStatus: false,
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

    this.props.onAddPicture(picture);
    history.goBack();
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    })
  }

  render() {
    let { txtName, txtLink, txtTags, radioStatus } = this.state;

    return (
      <Fragment>
        <h2 className="text-center mb-5">Add Picture</h2>
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
            <input 
              type="text" 
              className="form-control" 
              id="pictureTags" 
              placeholder="Enter tags" 
              name="txtTags"
              value={txtTags}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label className="mr-5" htmlFor="pictureStatus">Picture Status:</label>
            <RadioGroup 
              id="pictureStatus" 
              defaultValue={radioStatus}
              name="radioStatus"
              onChange={this.onChange} 
            >
              <RadioButton value={false}>New</RadioButton>
              <RadioButton value={true}>Feature</RadioButton>
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

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddPicture: (picture) => {
      dispatch(actAddPictureRequest(picture));
    }
  }
}

export default connect(null, mapDispatchToProps)(AdminAddPicturePage);
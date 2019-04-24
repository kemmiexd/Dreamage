import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { Radio } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AdminAddPicturePage extends Component {
  onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  }

  render() {
    return (
      <Fragment>
        <h2 className="text-center mb-5">Add Picture</h2>
        <form>
          <div className="form-group">
            <label htmlFor="pictureName">Picture Name:</label>
            <input 
              type="text" 
              className="form-control" 
              id="pictureName" 
              placeholder="Enter name" 
              name="txtName"
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
            />
          </div>
          <div className="form-group">
            <label className="mr-5" htmlFor="pictureStatus">Picture Status:</label>
            <RadioGroup id="pictureStatus" onChange={this.onChange} defaultValue="a">
              <RadioButton value="1">New</RadioButton>
              <RadioButton value="2">Feature</RadioButton>
              <RadioButton value="0">Private</RadioButton>
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

export default AdminAddPicturePage;
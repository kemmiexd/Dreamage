import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import PictureList from './../../../components/admin/PictureList';

class AdminPictureListPage extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center mb-5">Picture Manager</h1>
        <NavLink className="btn btn-primary mb-3" to="/admin/add-picture">
          <i className="mdi mdi-plus mr-1" />
          Add Picture
        </NavLink>
        <PictureList />
      </div>
    )
  }
}

export default AdminPictureListPage;
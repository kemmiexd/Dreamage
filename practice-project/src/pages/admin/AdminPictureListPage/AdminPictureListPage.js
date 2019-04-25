import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import PictureList from './../../../components/admin/PictureList';
import PictureItem from './../../../components/admin/PictureItem';
import { actFetchPicturesRequest, actDeletePictureRequest } from '../../../actions';

class AdminPictureListPage extends Component {
  componentDidMount() {
    this.props.fetchAllPictures();
  }

  onDelete = (id) => {
    this.props.onDeletePicture(id);
  }

  render() {
    const { pictures } = this.props;

    return (
      <div>
        <h1 className="text-center mb-5">Picture Manager</h1>
        <NavLink className="btn btn-primary mb-3" to="/admin/add-picture">
          <i className="mdi mdi-plus mr-1" />
          Add Picture
        </NavLink>
        <PictureList> 
          { this.showPictures(pictures) }
        </PictureList>
      </div>
    )
  }

  showPictures = pictures => {
    let result = null;
    if (pictures.length > 0) {
      result = pictures.map((picture, index) => {
        return <PictureItem 
          key={index}
          picture={picture}
          index={index}
          onDelete={this.onDelete}
        />
      });
    }

    return result;
  }
}

const mapStateToProps = state => {
  return {
    pictures: state.pictures
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllPictures: () => {
      dispatch(actFetchPicturesRequest());
    },
    onDeletePicture: (id) => {
      dispatch(actDeletePictureRequest(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPictureListPage);
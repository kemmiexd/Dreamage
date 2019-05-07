import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Layout } from 'antd';

import PictureList from './../../../components/admin/PictureList';
import PictureItem from './../../../components/admin/PictureItem';
import { actFetchPicturesRequest, actDeletePictureRequest } from '../../../actions';

const AddButton = styled.span `
  width: 150px;
  margin-bottom: 20px;
`

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
      <Layout style={{width: "1140px", margin: "auto", background: "none", marginTop: "50px"}}>
        <h1 className="text-center mb-5">Picture Manager</h1>
          <NavLink to="/admin/add-picture">
            <AddButton className="btn btn-primary">
              <i className="mdi mdi-plus mr-1" />
              Add Picture
            </AddButton>
          </NavLink>
        <PictureList> 
          { this.showPictures(pictures) }
        </PictureList>
      </Layout>
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
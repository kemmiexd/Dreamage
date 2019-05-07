import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Picture from './../../../components/client/Picture';
import SearchHome from './../../../components/client/SearchHome';
import PictureWrapper from '../../../components/client/PictureWrapper';

import { actFetchFeaturePicturesRequest } from './../../../actions';

class AdminHomePage extends React.Component {
  componentDidMount() {
    this.props.fetchFeaturePictures();
  }

  render() {
    const { pictures } = this.props;

    return (
      <Fragment>
        <SearchHome />

        <PictureWrapper>
          { this.showFeaturePictures(pictures) }            
        </PictureWrapper>
      </Fragment>
    )
  }

  showFeaturePictures = pictures => {
    let result = null;
    if (pictures.length > 0) {
      result = pictures.map((picture, index) => {
        return <Picture
          key={index}
          picture={picture}
        />
      });
    }

    return result;
  }

}

const mapStateToProps = state => {
  return {
    pictures: state.pictures,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchFeaturePictures: () => {
      dispatch(actFetchFeaturePicturesRequest());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomePage);
import React, { Fragment } from 'react';

import callApi from './../../../utils/apiCaller';

import Picture from './../../../components/client/Picture';
import SearchHome from './../../../components/client/SearchHome';
import PictureWrapper from '../../../components/client/PictureWrapper';


class AdminHomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    this.fetchFeaturePictures();
  }

  fetchFeaturePictures = () => {
    
    callApi('pictures', "GET", null).then((data) => {
      let featurePicture = data
        .sort((pic1, pic2) => pic2.id - pic1.id)
        .filter(pic => pic.status === "2");

      this.setState({
        data: featurePicture,
      });
    });
  }
  
  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <SearchHome />

        <PictureWrapper>
          { this.showFeaturePictures(data) }            
        </PictureWrapper>
      </Fragment>
    )
  }

  showFeaturePictures = data => {
    let result = null;
    if (data.length > 0) {
      result = data.map((picture, index) => {
        return <Picture
          key={index}
          picture={picture}
        />
      });
    }
    return result;
  }
}


export default AdminHomePage;
import React, { Fragment } from 'react';
import { Spin, Icon } from 'antd';

import callApi from './../../../utils/apiCaller';

import Picture from './../../../components/client/Picture';
import SearchHome from './../../../components/client/SearchHome';
import PictureWrapper from '../../../components/client/PictureWrapper';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class AdminHomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false
    }
  }
  componentDidMount() {
    this.fetchNewPictures();
  }

  fetchNewPictures = () => {
    this.setState({ loading: true });
    callApi('pictures', "GET", null).then((data) => {
      let newPicture = data
        .sort((pic1, pic2) => pic2.id - pic1.id)
        .filter(pic => pic.status === "1");

      this.setState({
        data: newPicture,
        loading: false
      });
    });
  }
  
  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <SearchHome />

        <PictureWrapper>
          <Spin indicator={antIcon} spinning={this.state.loading}>
            { this.showNewPictures(data) }            
          </Spin>
        </PictureWrapper>
      </Fragment>
    )
  }

  showNewPictures = data => {
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
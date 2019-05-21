import React, { Fragment, useState, useEffect } from 'react';
import { Spin, Icon } from 'antd';

import callApi from './../../../utils/apiCaller';

import Picture from './../../../components/client/Picture';
import SearchHome from './../../../components/client/SearchHome';
import PictureWrapper from '../../../components/client/PictureWrapper';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const AdminHomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchNewPictures();
  }, []);

  const fetchNewPictures = () => {
    setLoading(true);
    callApi('pictures', "GET", null).then(res => {
      let newPicture = res
        .sort((pic1, pic2) => pic2.id - pic1.id)
        .filter(pic => pic.status === "1");

      setData(newPicture);
      setLoading(false);
    });
  }

  const showNewPictures = data => {
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

  const onShow = data.length > 0 ? showNewPictures(data) : <div className="text-center"><h1>No data</h1></div>;
  
  return (
    <Fragment>
      <SearchHome />

      <PictureWrapper>
        <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
          { onShow }            
        </Spin>
      </PictureWrapper>
    </Fragment>
  )

  
}


export default AdminHomePage;
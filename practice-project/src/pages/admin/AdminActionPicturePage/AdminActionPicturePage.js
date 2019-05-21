import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { Layout, Radio, Select, Upload, message, Icon, Row, Col, Spin } from 'antd';

import callApi from './../../../utils/apiCaller';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const slugReplace = slug => {
  return slug
    .trim()
    .toLowerCase()
    .replace(/--/g, "")
    .replace(/ +/g, "-")
    .replace(/[/_'".*+?^${}()|[\]\\~`=!@#%&;:<>,]/g, "")
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e")
    .replace(/ì|í|ị|ỉ|ĩ/g,"i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
    .replace(/đ/g,"d");
}

const AdminAddPicturePage = props => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    id: '',
    txtName: '',
    txtSlug: '',
    txtLink: '',
    arrTags: [],
    radioStatus: "0",
  });

  useEffect(() => {
    const { match } = props;
    if (match) {
      let id = match.params.id;
      onGetPicture(id);
    }
  }, [props]);

  let { history } = props;
  let { id, txtName, txtSlug, txtLink, arrTags, radioStatus } = state;
  txtSlug = slugReplace(txtName);

  const onAddPicture = picture => {
    setLoading(true);

    callApi('pictures', "POST", picture).then(res => {
      setLoading(false)
      history.push(`/admin/edit/${res.id}`);
      message.success(`Created picture successfully, please check again and save!`);
    });
  }

  const onGetPicture = id => {
    setLoading(true);

    callApi(`pictures/${id}`, "GET", null).then(res => {
      setState( state => ({
        ...state,
        id: res.id,
        txtName: res.name,
        txtSlug: res.slug,
        txtLink: res.link,
        arrTags: res.tags,
        radioStatus: res.status,
      }));

      setLoading(false);
    });
  }

  const onUpdatePicture = picture => {
    setLoading(true)
    
    callApi(`pictures/${picture.id}`, "PUT", picture).then(() => {
      setLoading(false);

      history.push('/admin/picture-list');
      message.success(`Updated successfully picture has id is ${picture.id}!`);
    });

  }

  const onSave = e => {
    e.preventDefault();
    let picture = {
      id: id,
      name: txtName,
      slug: txtSlug,
      link: txtLink,
      tags: arrTags,
      status: radioStatus
    }

    picture.status = parseInt(picture.status, 10);

    if (id) {
      onUpdatePicture(picture);
    } else {
      onAddPicture(picture);
    }
  }

  const onChange = e => {
    let name = e.target.name;
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setState(state => ({
      ...state,
      [name]: value
    }));
  }
  
  const handleChange = value => {
    setState(state => ({
      ...state,
      arrTags: value
    }));
  }

  
  const beforeUpload = file => {
    const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
    if (!isJPG) {
      message.error('You can only upload JPG and PNG file!');
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('Image must smaller than 4MB!');
    }
    return isJPG && isLt4M;
  }

  const uploadImage = info => {
    if (info.file.status === 'done') {
      let imagePath = info.file.response.data.link;
      message.success(`${info.file.name} file uploaded successfully.`);
      setState(state => ({
        ...state,
        txtLink: imagePath,
      }));
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const title = id ? 'Update Picture' : 'Create Picture';
  const buttonTitle = id ? 'Save picture' : 'Create picture'
  const uploadWidth = txtLink ? 12 : 24;
  const imageWidth = txtLink ? 12 : 0;

  return (
    <Layout style={{width: "1140px", margin: "auto", background: "none", marginTop: "50px"}}>
      <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
        <h2 className="text-center mb-5">{ title }</h2>
        <form onSubmit={onSave}>
          <div className="form-group row">
            <label className="col-2 mt-2" htmlFor="pictureName">Picture Name:</label>
            <input 
              type="text" 
              className="form-control col-10" 
              id="pictureName" 
              placeholder="Enter name" 
              name="txtName"
              value={txtName}
              onChange={onChange}
            />
          </div>
          <div className="form-group row">
            <label className="col-2 mt-2" htmlFor="pictureSlug">Picture Slug:</label>
            <input 
              type="text" 
              className="form-control col-10" 
              disabled="disabled"
              id="pictureSlug" 
              name="txtSlug"
              value={txtSlug}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="" htmlFor="pictureLink">Picture Link:</label>
            <Row>
              <Col span={uploadWidth}>
                <Dragger 
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  action="http://localhost:3001/api/api-upload/"
                  beforeUpload={beforeUpload}
                  onChange={uploadImage}
                  value={txtLink}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
              </Col>
              <Col span={imageWidth}>
                {txtLink ? <img style={{height: "170px", marginLeft: "30px"}} src={txtLink} alt="avatar" /> : ''}
              </Col>
            </Row>

          </div>
          <div className="form-group row">
            <label className="col-2 mt-2" htmlFor="pictureTags">Picture Tags:</label>
            <Select
              mode="tags"
              className="col-10"
              placeholder="Enter Tags"
              onChange={handleChange}
              name="arrTags"
              value={arrTags}
            >
            </Select>
          </div>
          <div className="form-group">
            <label className="mr-5" htmlFor="pictureStatus">Picture Status:</label>
            <RadioGroup 
              id="pictureStatus" 
              className="col-10"
              name="radioStatus"
              value={radioStatus}
              onChange={onChange} 
            >
              <RadioButton value="0">Private</RadioButton>
              <RadioButton value="1">New</RadioButton>
              <RadioButton value="2">Feature</RadioButton>
            </RadioGroup>
          </div>
          <div className="text-center mt-4 mb-5">
            <button type="submit" className="btn btn-primary mr-2 px-4">{ buttonTitle }</button>
            <NavLink to="/admin/picture-list" className="btn btn-danger px-4">Back</NavLink></div>
        </form>
      </Spin>
    </Layout>   
  )
}


export default AdminAddPicturePage;
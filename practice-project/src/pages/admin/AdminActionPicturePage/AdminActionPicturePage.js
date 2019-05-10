import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout, Radio, Select, Upload, message, Icon, Row, Col } from 'antd';

import { actAddPictureRequest, actGetPictureRequest, actUpdatePictureRequest } from '../../../actions/index';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;

function beforeUpload(file) {
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

class AdminAddPicturePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      txtName: '',
      txtSlug: '',
      txtLink: '',
      arrTags: [],
      radioStatus: '0',
    }
  }

  componentDidMount() {
    const { match } = this.props;

    if (match) {
      let id = match.params.id;
      this.props.onGetPicture(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditing) {
      const { itemEditing } = nextProps;
      this.setState({
        id: itemEditing.id,
        txtName: itemEditing.name,
        txtSlug: itemEditing.slug,
        txtLink: itemEditing.link,
        arrTags: itemEditing.tags,
        radioStatus: itemEditing.status
      })
    }
  }

  onSave = (e) => {
    e.preventDefault();

    let { id, txtName, txtSlug, txtLink, arrTags, radioStatus } = this.state;
    
    let { history } = this.props;
    
    let picture = {
      id: id,
      name: txtName,
      slug: txtSlug,
      link: txtLink,
      tags: [...arrTags],
      status: radioStatus
    }
    
    if (id) {
      this.props.onUpdatePicture(picture);
      history.goBack();
    } else {
      this.props.onAddPicture(picture);
      history.goBack();
    }
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    })
  }
  
  handleChange = (value) => {
    this.setState({
      arrTags: value
    })
  }

  slugReplace = (slug) => {
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

  uploadImage = (info) => {
    if (info.file.status === 'done') {
      let imagePath = info.file.response.path;
      imagePath = `http://localhost:3000/${imagePath}`;
      message.success(`${info.file.name} file uploaded successfully.`);
      this.setState({
        txtLink: imagePath,
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    let { id, txtName, txtLink, radioStatus, arrTags, txtSlug } = this.state;
    const title = id ? 'Update Picture' : 'Add Picture';
    const children = [];
    txtSlug = this.slugReplace(txtName);

    const uploadWidth = txtLink ? 12 : 24;
    const imageWidth = txtLink ? 12 : 0;

    return (
      <Layout style={{width: "1140px", margin: "auto", background: "none", marginTop: "50px"}}>
        <h2 className="text-center mb-5">{ title }</h2>
        <form onSubmit={this.onSave}>
          <div className="form-group row">
            <label className="col-2 mt-2" htmlFor="pictureName">Picture Name:</label>
            <input 
              type="text" 
              className="form-control col-10" 
              id="pictureName" 
              placeholder="Enter name" 
              name="txtName"
              value={txtName}
              onChange={this.onChange}
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
              onChange={this.onChange}
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
                  action="http://localhost:3000/api/api-upload/"
                  beforeUpload={beforeUpload}
                  onChange={this.uploadImage}
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
              onChange={this.handleChange}
              name="arrTags"
              value={arrTags}
            >
              {children}
            </Select>
          </div>
          <div className="form-group">
            <label className="mr-5" htmlFor="pictureStatus">Picture Status:</label>
            <RadioGroup 
              id="pictureStatus" 
              className="col-10"
              name="radioStatus"
              value={radioStatus}
              onChange={this.onChange} 
            >
              <RadioButton value="0">Private</RadioButton>
              <RadioButton value="1">New</RadioButton>
              <RadioButton value="2">Feature</RadioButton>
            </RadioGroup>
          </div>
          <div className="text-center mt-4 mb-5">
            <button type="submit" className="btn btn-primary mr-2 px-5">Submit</button>
            <NavLink to="/admin/picture-list" className="btn btn-danger px-5">Back</NavLink></div>
        </form>
      </Layout>
    
      
    )
  }
}

const mapStateToProps = state => {
  return {
    itemEditing: state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddPicture: (picture) => {
      dispatch(actAddPictureRequest(picture));
    },
    onGetPicture: (id) => {
      dispatch(actGetPictureRequest(id));
    },
    onUpdatePicture: (picture) => {
      dispatch(actUpdatePictureRequest(picture));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddPicturePage);
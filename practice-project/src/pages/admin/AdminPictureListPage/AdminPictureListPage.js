import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Table, Tag, Layout, Button, Popconfirm } from 'antd';

import { actFetchPicturesRequest, actDeletePictureRequest } from '../../../actions';

const { Column } = Table;

const AddButton = styled.span `
  width: 150px;
`

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Thumbnail',
    dataIndex: 'link',
    render: img => <img src={img} alt="1" />
  },
  {
    title: "Tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.map((tag, index) => <Tag color="blue" key={index}>{tag}</Tag>)}
      </span>
    )
  },
  {
    title: "Status",
    dataIndex: "status",
    render: status => (
      status === "2" ? (<Tag color='#108ee9'>Feature</Tag>)
      : status === "1" ? (<Tag color='#f50'>New</Tag>) 
      : (<Tag color='#f00'>Private</Tag>) 
    ),
    filters: [
      {
        text: 'Private',
        value: '0',
      },
      {
        text: 'Feature',
        value: '2',
      }, 
      {
        text: 'New',
        value: '1',
      }
    ],

    onFilter: (value, record) => record.status.includes(value),
    sortDirections: ['descend'],
  },
  {
    title: "Action",
    render: picture => (
      <span>
        <Button className="mr-2" type="primary" size="default">
          <NavLink to={`/admin/edit/${picture.id}`}>
            <i className="mdi mdi-pencil-box-outline" />
            Edit
          </NavLink>
        </Button>
        <Popconfirm title="Are you sure delete this picture?" onConfirm={() => this.onDelete(picture.id)} okText="Yes" cancelText="No">
          <Button 
            type="danger" 
            size="default"
          >
            <i className="mdi mdi-delete" />
            Delete
          </Button>
        </Popconfirm>
      </span>
    )
  }

];


class AdminPictureListPage extends Component {
  componentDidMount() {
    this.props.fetchAllPictures();
  }

  onDelete = (id) => {
    this.props.onDeletePicture(id);
  }

  onChange = (pagination, filters, sorter) => {
    // console.log('params', pagination, filters, sorter);
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
        {/* <PictureList> 
          { this.showPictures(pictures) }
        </PictureList> */}
        <Table columns={columns} onChange={this.onChange} dataSource={pictures} bordered pagination={{position: 'both'}}>
          <Column
            title="ID"
            dataIndex="id"
          />
          <Column
            title="Name"
            dataIndex="name"
          />
          <Column
            title="Thumbnail"
            dataIndex="link"
            render={img => <img src={img} alt="1" />}
          />
          <Column
            title="Tags"
            dataIndex="tags"
            render={tags => (
              <span>
                {tags.map((tag, index) => <Tag color="blue" key={index}>{tag}</Tag>)}
              </span>
            )}
          />
          <Column
            title="Status"
            dataIndex="status"
            render={status => (
              status === "2" ? (<Tag color='#108ee9'>Feature</Tag>)
              : status === "1" ? (<Tag color='#f50'>New</Tag>) 
              : (<Tag color='#f00'>Private</Tag>) 
            )}
          />
          <Column
            title="Action"
            render={(picture) => (
              <span>
                <Button className="mr-2" type="primary" size="default">
                  <NavLink to={`/admin/edit/${picture.id}`}>
                    <i className="mdi mdi-pencil-box-outline" />
                    Edit
                  </NavLink>
                </Button>
                <Popconfirm title="Are you sure delete this picture?" onConfirm={() => this.onDelete(picture.id)} okText="Yes" cancelText="No">
                  <Button 
                    type="danger" 
                    size="default"
                  >
                    <i className="mdi mdi-delete" />
                    Delete
                  </Button>
                </Popconfirm>
              </span>
            )}
          />
        </Table>
      </Layout>
    )
  }

  // showPictures = pictures => {
  //   let result = null;
  //   if (pictures.length > 0) {
  //     result = pictures.map((picture, index) => {
  //       return <PictureItem 
  //         key={index}
  //         picture={picture}
  //         index={index}
  //         onDelete={this.onDelete}
  //       />
  //     });
  //   }

  //   return result;
  // }
}

const mapStateToProps = state => {
  return {
    pictures: state.pictures
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllPictures: (index) => {
      dispatch(actFetchPicturesRequest(index));
    },
    onDeletePicture: (id) => {
      dispatch(actDeletePictureRequest(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPictureListPage);

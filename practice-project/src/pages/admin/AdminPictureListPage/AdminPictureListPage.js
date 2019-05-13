import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Table, Tag, Layout, Button, Popconfirm, message } from 'antd';
import reqwest from 'reqwest';
import axios from 'axios';

import { actFetchPicturesRequest, actDeletePictureRequest } from '../../../actions';

const AddButton = styled.span `
  width: 150px;
`

class AdminPictureListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchAllPictures();
    // this.setState({ 
    //   loading: true,
    //   data: pictures
    // });
  }

  onDelete = (id) => {
    this.props.onDeletePicture(id);
    message.success(`Deleted picture with id is ${id}`);
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetchAllPictures({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetchAllPictures = () => {
    this.setState({ loading: true });
    axios({
      method: 'get',
      url: 'http://5bb8ef65b6ed2c0014d47508.mockapi.io/Ok/pictures',
      type: 'json',
    }).then((res) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      this.setState({
        loading: false,
        data: res.data,
        pagination,
      });
    });
  }

  render() {
    const { pictures } = this.props;

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

    return (
      <Layout style={{width: "1140px", margin: "auto", background: "none", marginTop: "50px"}}>
        <h1 className="text-center mb-5">Picture Manager</h1>
          <NavLink to="/admin/add-picture">
            <AddButton className="btn btn-primary">
              <i className="mdi mdi-plus mr-1" />
              Add Picture
            </AddButton>
          </NavLink>

        <Table 
          columns={columns} 
          bordered 
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        >
        </Table>
      </Layout>
    )
  }
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

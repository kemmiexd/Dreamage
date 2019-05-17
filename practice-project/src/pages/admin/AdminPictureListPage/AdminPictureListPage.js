import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Table, Tag, Layout, Button, Popconfirm, message, Spin, Icon } from 'antd';

import callApi from './../../../utils/apiCaller';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const ButtonAll = styled.button `
  width: 230px;
`

function AdminPictureListPage() {
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([{
    key: '',
    id: '',
    name: '',
    link: '',
    tags: [],
    status: "0",
  }]);

  const [pagination, setPagination] = useState({
    showSizeChanger: true, 
    showQuickJumper: true, 
    position: "both", 
    showTotal: (total, range) => (`${range[0]}-${range[1]} of ${total} items`),
  });

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: "5%",
      sorter: (a, b) => b.id - a.id,
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
          { tags.length > 0 && tags.map((tag, index) => { 
            let color = tag.length > 5 ? 'geekblue' : tag.length > 10 ? 'volcano' : 'green';
            return <Tag color={color} key={index}>{tag}</Tag>
          })}
        </span>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "7%",
      render: (status) => { 
        const color = status === "2" ? '#108ee9' : status === "1" ? '#f50' : '#f00';
        const name = status === "2" ? 'Feature' : status === "1" ? 'New' : 'Private';
        return <Tag color={color}>{name}</Tag> 
      },
      filters: [
        { text: 'Private', value: "0" },
        { text: 'Feature', value: "2" }, 
        { text: 'New', value: "1" }
      ],
  
      onFilter: (value, record) => record.status.includes(value),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Action",
      width: "20%",
      render: picture => (
        <span>
          <Button className="mr-2" type="primary" size="default">
            <NavLink to={`/admin/edit/${picture.id}`}>
              <i className="mdi mdi-pencil-box-outline" />
              Edit
            </NavLink>
          </Button>
          <Popconfirm title="Are you sure delete this picture?" onConfirm={() => onDelete(picture.id)} okText="Yes" cancelText="No">
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

  const diabledButton = selectedRows && selectedRowKeys.length > 0 ? "" : "disabled";
  const buttonCreateClassName = data.length < 1 ? "mb-5" : "";

  useEffect(() => {
    fetchAllPictures();
  });
  
  const handleTableChange = (pagination, filters, sorter) => {
    // const pager = { ...pagination };
    // pager.current = pagination.current;
    // setPagination({...pagination});

    fetchAllPictures({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  const fetchAllPictures = () => {
    setLoading(loading)
    callApi(`pictures`, "GET", null).then((res) => {
      setData(res);
      res.tags = data.tags;
      data.sort((a, b) => {
        return b.id - a.id
      });
      setPagination(pagination);
      setLoading(false);
    });
  }

  
  const onDelete = id => {
    setLoading(true);

    let index = -1;
    const findIndex = (picture, id) => {
      let result = -1;
      data.forEach((picture, index) => {
        if (picture.id === id) {
          result = index
        }
      });
      return result;
    }
    index = findIndex(data, id);

    callApi(`pictures/${id}`, "DELETE", null).then(() => {
      data.splice(index, 1);
      setLoading(false);
      message.success(`Deleted picture with id is ${id}`);
    });
  }

  const onDeleteAllSelected = selectedRows => {
    setLoading(true);

    if (selectedRows) {
      for (let selectedRow of selectedRows ) {
        let index = -1;
        const findIndex = (picture, id) => {
          let result = -1;
          data.forEach((picture, index) => {
            if (picture.id === id) {
              result = index
            }
          });
          return result;
        }
        index = findIndex(data, selectedRow.id);
        callApi(`pictures/${selectedRow.id}`, "DELETE", null).then(() => {
          data.splice(index, 1);
          message.success(`Deleted picture with id is ${selectedRow.id}`);
        });
      }
    }
    setLoading(false);
  }
  
  return (
    <Layout style={{width: "1140px", margin: "auto", background: "none", marginTop: "20px"}}>
      <h1 className="text-center mb-3">Picture Manager</h1>
      <div className="d-flex">
        <div style={{width: "100%"}}>
          <NavLink to="/admin/add-picture">
            <span className={`btn btn-warning px-4 ${buttonCreateClassName}`}>
              <i className="mdi mdi-plus mr-1" />
              Create Picture
            </span>
          </NavLink>
        </div>
        <Popconfirm 
          title="Are you sure delete selected picture?" 
          onConfirm={() => onDeleteAllSelected(selectedRows)} 
          okText="Yes, Delete all" 
          cancelText="No"
        >
          <ButtonAll disabled={diabledButton} className={`btn btn-danger px-4 ${buttonCreateClassName}`}>
            <i className="mdi mdi-delete mr-1" />
            Delete all selected
          </ButtonAll>
        </Popconfirm> 
      </div>
      <Spin indicator={antIcon} spinning={loading}>
        <Table 
          bordered
          columns={columns} 
          dataSource={data}
          pagination={pagination}
          onChange={handleTableChange}
          showTotal={pagination.showTotal} 
          rowSelection={rowSelection}
        >
        </Table>
      </Spin>
    </Layout>
  )
}


export default AdminPictureListPage;

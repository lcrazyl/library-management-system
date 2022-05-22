import React, { useEffect, useState } from "react";
import { Table, Card, Button, message, Tag, DatePicker, Form, Modal, Input } from "antd";
import { getAllBorrower } from "../../utils/api";
import moment from "moment";
const Index = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookId, setBookId] = useState(null);
  const date = new Date().getTime();
  let [allBooks, setAllBooks] = useState(null);
  useEffect(() => {
    const getData = () => {
      getAllBorrower().then(res => {
        setAllBooks(res.data)
      })
    };
    getData();
  }, []);
  const handleTime = ({ id }) => {
    setIsModalVisible(true);
    setBookId(id);
  }
  const columns = [
    {
      title: "借书人",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "借阅图书",
      dataIndex: "bookName",
      key: "bookName",
    },
    {
      title: "借出时间",
      dataIndex: "loanTime",
      key: "loanTime",
      render: text => <span>{moment(text).format("YYYY/MM/DD")}</span>
    },
    {
      title: "归还时间",
      dataIndex: "returnTime",
      key: "returnTime",
      render: text => <span>{moment(text).format("YYYY/MM/DD")}</span>
    },
    {
      title: "剩余时间",
      dataIndex: "timeLeft",
      key: "timeLeft",
      render: (text, record) => {
        const d = Math.floor((record.returnTime - date) / (24 * 3600 * 1000))
        if (d > 100) {
          return <Tag>{d}天</Tag>
        } else if (d > 20) {
          return <Tag color="processing">{d}天</Tag>
        } else {
          return <Tag color="warning">{d}天</Tag>
        }
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Button disabled={record.status === 1} onClick={() => handleReturn(record)}>归还</Button>
          <Button disabled={record.status === 1} onClick={() => handleTime(record)}>续时</Button>
        </>
      )
    },
  ];

  const handleReturn = (record) => {
    allBooks = allBooks.filter(item => {
      return item.id !== record.id;
    })
    setAllBooks(allBooks);
    message.success('还书成功!');
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onAddFinish = () => {
    let allInfo = form.getFieldValue();
    let { newDate } = allInfo;
    newDate = Number(allInfo.newDate.format('x'));
    allBooks = allBooks.filter(item => {
      if (item.id === bookId) {
        item.returnTime = newDate;
      }
      return allBooks;
    })
    setAllBooks(allBooks);
    message.success('归还时间已更新!')
    setIsModalVisible(false);
  };
  return (
    <Card title="借阅人" style={{ height: 680, overflowY: 'scroll' }}>

      <Modal title="续时" visible={isModalVisible} footer={
        <Form.Item wrapperCol={{ span: 3, offset: 3 }} onClick={onAddFinish}>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      } onOk={onAddFinish} onCancel={handleCancel}>
        <Form
          form={form}
          name="add"
          initialValues={{ remember: true }}
          onFinish={onAddFinish}
          autoComplete="off"
        >
          <Form.Item
            label="到期时间"
            name="newDate"
          >
            <DatePicker picker="week" />
          </Form.Item>
        </Form>
      </Modal>
      <Table rowKey={record => record.id} columns={columns} dataSource={allBooks} />
    </Card >
  );
};
export default Index;

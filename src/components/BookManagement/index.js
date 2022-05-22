import React, { useEffect, useState } from "react";
import { Table, Card, Button, message, Form, Input, Modal, DatePicker, Select } from "antd";
import { getAllBooks } from "../../utils/api";
import moment from "moment";
const { Option } = Select;
const Index = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    let [filterBooks, setFilterBooks] = useState(null);  //查询到的图书
    let [allBooks, setAllBooks] = useState(null);       // 请求到所有图书
    //请求数据获取所有图书
    useEffect(() => {
        const getData = () => {
            getAllBooks().then(res => {
                setAllBooks(res.data)
            })
        };
        getData();
    }, []);
    const columns = [
        {
            title: "图书名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "图书作者",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "出版时间",
            dataIndex: "publishDate",
            key: "publishDate",
            render: text => <span>{moment(text).format("YYYY/MM/DD")}</span>
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            render: text => (
                text === 1 ? <span>已借</span> : <span>可借</span>
            )
        }, {
            title: "归还时间",
            dataIndex: "returnTime",
            key: "returnTime",
            render: (text, record) => (record.status === 1 ? <span >{moment(text).format("YYYY/MM/DD")}</span> : <span>图书未借出</span>)
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            render: (text, record, index) => (
                <>
                    <Button disabled={record.status === 1} onClick={() => handleRemove(record)}>删除</Button>
                    <Button disabled={record.status === 1} onClick={() => handleBorrower(record)}>借书</Button>
                </>
            )
        },
    ];
    const handleRemove = ({ id }) => {
        allBooks = allBooks.filter((item) => {
            return item.id !== id
        })
        setAllBooks(allBooks);
        message.success('图书已删除');
    }
    const handleBorrower = ({ id }) => {
        allBooks = allBooks.filter(item => {
            if (item.id === id) {
                item.status = 1;
            }
            return allBooks;
        })
        setAllBooks(allBooks);
        message.success('已成功借出!')
    }
    const onFinish = (values) => {
        if (values) {
            let book = allBooks.filter(item => {
                return item.name === values
            })
            setFilterBooks(book);
        } else {
            setFilterBooks(null);
        }
    };


    const onAddFinish = () => {
        let allInfo = form.getFieldValue();
        let { name, author, status, publishDate } = allInfo;
        publishDate = allInfo.publishDate.format('x');
        status = Number(status);
        const id = Number(publishDate) - 100;
        const newDate = {
            name,
            author,
            publishDate,
            status,
            id
        }
        let isbook = allBooks.filter(item => {
            return item.name === name;
        })
        if (!isbook[0]) {
            allBooks.push(newDate);
            setAllBooks(allBooks);
            message.success('添加成功!');
            setIsModalVisible(false);
        } else {
            message.error('本书已有，添加失败!');
            setIsModalVisible(false);
        }

    };


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Card title="图书" style={{ height: 680, overflowY: 'scroll' }}>
            <Input.Search placeholder="请输入书名" style={{ width: 500, marginRight: 50, marginBottom: 10 }} allowClear={true} enterButton={true} onSearch={onFinish}></Input.Search>
            <Button type="primary" onClick={showModal} style={{ marginRight: 50 }}>
                添加图书
            </Button>
            <Modal title="添加图书" visible={isModalVisible} footer={
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
                        label="图书名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="作者姓名"
                        name="author"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="出版时间"
                        name="publishDate"
                    >
                        <DatePicker picker="week" />
                    </Form.Item>
                    <Form.Item
                        label="状态"
                        name="status"
                    >
                        <Select style={{ width: '100%' }}>
                            <Option key='1'>已借出</Option>
                            <Option key='2'>可借</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} rowKey={record => record.id} dataSource={filterBooks ? filterBooks : allBooks} />
        </Card >
    );
};
export default Index;

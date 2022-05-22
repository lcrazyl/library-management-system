import React, { useEffect, useState } from "react";
import { Table, Card, Button, message, Form, Input, Modal, DatePicker, Select, Tag, InputNumber } from "antd";
import { getUserManage } from "../../utils/api";
import './index.css'
import moment from "moment";

const { Option } = Select;
const Index = () => {

    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    let [filterUser, setFilterUser] = useState(null);  //查询到的图书
    let [allUser, setAllUser] = useState([]);       // 请求到所有图书

    //请求数据获取所有图书
    useEffect(() => {
        const getData = () => {
            getUserManage().then(res => {
                setAllUser(res.data)
            })
        };
        getData();
    }, []);
    const columns = [
        {
            title: "姓名",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "联系方式",
            dataIndex: "phone",
            key: "phone",
        },

        {
            title: "到期时间",
            dataIndex: "startTime",
            key: "startTime",
            render: (text, record) => {
                if (record.type === '月卡') {
                    if (moment().isBefore(moment(text).add(30, 'd'))) {
                        return <Tag color="warning">已过期</Tag>
                    }
                    return <Tag>{moment(text).add(30, 'd').format("YYYY/MM/DD")}</Tag>
                } else if (record.type === '季卡') {
                    if (moment().isBefore(moment(text).add(1, 'm'))) {
                        return <Tag color="warning">已过期</Tag>
                    }
                    return <Tag>{moment(text).add(1, 'm').format("YYYY/MM/DD")}</Tag>
                } else {
                    if (moment().isBefore(moment(text).add(1, 'y'))) {
                        return <Tag color="warning">已过期</Tag>
                    }
                    return <Tag>{moment(text).add(1, 'y').format("YYYY/MM/DD")}</Tag>
                }
            }

        },
        {
            title: "类型",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            render: (text, record, index) => (
                <>
                    <Button disabled={record.status === 1} onClick={() => handleRemove(record)}>删除</Button>
                    <Button disabled={record.status === 1} onClick={() => handleAdit(record)}>编辑</Button>
                </>
            )
        },
    ];
    const handleRemove = ({ id }) => {
        allUser = allUser.filter((item) => {
            return item.id !== id
        })
        setAllUser(allUser);
        message.success('用户已删除');
    }
    const handleAdit = (record) => {
        form.setFieldsValue({
            name: record.name,
            type: record.type,
            startTime: moment(record.startTime),
            booksNum: record.booksNum,
            borrowed: record.borrowed,
            id: record.id,
            phone: record.phone,
            address: record.address,
        })
        setIsAdd(false);
        setIsModalVisible(true);

    }
    const onFinish = (values) => {
        if (values) {
            let book = allUser.filter(item => {
                return item.name === values
            })
            setFilterUser(book);
        } else {
            setFilterUser(null);
        }
    };


    const onAddFinish = (adit) => {
        let allInfo = form.getFieldValue();
        let { name, phone, type, startTime, address, booksNum,
            borrowed, id } = allInfo;
        startTime = Number(allInfo.startTime.format('x'));
        id = Number(id) || Number(startTime) - 100;
        booksNum = Number(booksNum);
        borrowed = Number(borrowed);
        const newData = {
            name,
            startTime,
            type,
            address,
            id,
            booksNum,
            borrowed,
            phone
        }
        let isbook = allUser.filter(item => {
            return item.name === name;
        })
        if (adit) {
            allUser = allUser.filter((item, index) => {
                if (Number(item.id) === id) {
                    allUser[index] = newData;
                }

                return allUser;
            })
            setAllUser([...allUser]);
            message.success('修改成功!');
            setIsModalVisible(false);
        } else {

            if (!isbook[0]) {
                allUser.push(newData);
                setAllUser([...allUser]);
                message.success('添加成功!');
                setIsModalVisible(false);
            } else {
                message.error('该用户存在，添加失败!');
                setIsModalVisible(false);
            }
        }

    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Card title="用户管理" style={{ height: 680, overflowY: 'scroll' }}>
            <Input.Search placeholder="请输入会员名" style={{ width: 500, marginRight: 50, marginBottom: 10 }} allowClear={true} enterButton={true} onSearch={onFinish}></Input.Search>
            <Button type="primary" onClick={showModal} style={{ marginRight: 50 }}>
                添加用户
            </Button>
            <Modal title="添加用户" visible={isModalVisible} footer={
                <Form.Item wrapperCol={{ span: 3, offset: 3 }} onClick={isAdd ? () => onAddFinish() : () => onAddFinish('adit')}>
                    <Button type="primary" htmlType="submit">
                        {isAdd ? '添加' : "修改"}
                    </Button>
                </Form.Item>
            } onCancel={handleCancel}>
                <Form
                    form={form}
                    name="add"
                    initialValues={{ remember: true }}

                    autoComplete="off"
                >
                    <Form.Item
                        label="会员名"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="联系方式"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="address"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="注册时间"
                        name="startTime"
                    >
                        <DatePicker picker="week" />
                    </Form.Item>
                    <Form.Item
                        label="状态"
                        name="type"
                    >
                        <Select style={{ width: '100%' }}>
                            <Option key='月卡'>月卡</Option>
                            <Option key='季卡'>季卡</Option>
                            <Option key='年卡'>年卡</Option>
                        </Select>
                    </Form.Item >
                    <Form.Item
                        label="已借图书"
                        name="borrowed">
                        <InputNumber min={1} max={10} defaultValue={1} />
                    </Form.Item>
                    <Form.Item
                        label="共借图书"
                        name="booksNum">
                        <InputNumber min={1} max={20} defaultValue={1} />
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} rowKey={record => record.id} expandable={{
                expandedRowRender: record => {
                    return (
                        <>
                            <p style={{ margin: 0 }} className='expand'>
                                <span>会员名：{record.name}</span>
                                <span>联系电话：{record.phone}</span>
                                <span>地址：{record.address}</span>
                                <span>会员类型：{record.type}</span>
                                <span>共借图书：{record.booksNum}本</span>
                                <span>已借图书：{record.borrowed}本</span>
                                <span>创建时间：{moment(record.startTime).format("YYYY/MM/DD")}</span>
                            </p>
                        </>
                    )
                },
            }}
                dataSource={filterUser ? filterUser : allUser} />

        </Card >
    );
};
export default Index;

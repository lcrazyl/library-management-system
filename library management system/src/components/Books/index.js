import React, { useEffect, useState } from "react";
import { Table, Card, Button, message, Input } from "antd";
import { getAllBooks } from "../../utils/api";
import moment from "moment";
const Index = () => {

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

                    <Button disabled={record.status === 1} onClick={() => handleBorrower(record)}>借书</Button>
                </>
            )
        },
    ];

    const handleBorrower = ({ id }) => {
        allBooks = allBooks.filter(item => {
            if (item.id === id) {
                item.status = 1;
            }
            return allBooks;
        })
        setAllBooks(allBooks);
        message.success('已成功借出！')
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

    return (
        <Card title="图书" style={{ height: 680, overflowY: 'scroll' }}>
            <Input.Search placeholder="请输入书名" style={{ width: 500, marginRight: 50, marginBottom: 10 }} allowClear={true} enterButton={true} onSearch={onFinish}></Input.Search>
            <Table columns={columns} rowKey={record => record.id} dataSource={filterBooks ? filterBooks : allBooks} />
        </Card >
    );
};
export default Index;

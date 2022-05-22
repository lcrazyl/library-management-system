import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd'
import moment from 'moment';
import { getRecord } from'../../utils/api'
export default function Index() {
    let [allBooks, setAllBooks] = useState(null);       // 请求到所有图书
    //请求数据获取所有图书
    useEffect(() => {
        const getData = () => {
            getRecord().then(res => {
                setAllBooks(res.data)
            })
        };
        getData();
    }, []);

    const columns = [
        {
            title: "商品信息",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "借阅时间",
            dataIndex: "time",
            key: "name",
            render:text=>(
                <span>{moment(text).format("YYYY/MM/DD")}</span>
            )
        },
    ];
    return (
        <Card title="订单管理">
            <Table  columns={columns} rowKey={record => record.id} dataSource={ allBooks} />
        </Card>
    )
}

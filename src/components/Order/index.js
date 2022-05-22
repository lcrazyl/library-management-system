import React, { useState, useEffect } from 'react';
import { Card, Table, Button, message } from 'antd'
import moment from 'moment';
import { getOrder } from'../../utils/api'
export default function Index() {
    let [allOrder, setAllOrder] = useState(null);
    //请求数据获取所有图书
    useEffect(() => {
        const getData = () => {
            getOrder().then(res => {
                setAllOrder(res.data)
            })
        };
        getData();
    }, []);
    const handleBorrower = ({ id, status }) => {
        allOrder = allOrder.filter(item => {
            if (item.id === id) {
                item.status = true;
            }
            return allOrder;
        })
        setAllOrder(allOrder);
        message.success('订单已确认!');
    }
    const columns = [
        {
            title: "订单编号",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "商品信息",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "下单时间",
            dataIndex: "buyTime",
            key: "buyTime",
            render: text => <span>{moment(text).format("YYYY/MM/DD")}</span>
        },
        {
            title: "订单状态",
            dataIndex: "status",
            key: "status",
            render: (text, record) => {
                if (text) {
                    return <Button disabled>已确认</Button>
                } else {
                    return <Button onClick={() => handleBorrower(record)}>确认订单</Button>
                }

            }
        }
    ];
    return (
        <Card title="订单管理">
            <Table columns={columns} rowKey={record => record.id} dataSource={allOrder} />
        </Card>
    )
}

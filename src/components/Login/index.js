import React from 'react'
import { Form, Input, Button } from 'antd';
import './index.css'
export default function index() {
    const onFinish = (values) => {
        let rolue = null;
        if (values.username === 'superAdmin') {
            rolue = 'superAdmin'
        } else if (values.username === 'admin') {
            rolue = 'admin'
        } else {
            rolue = 'user';
        }
        let userInfo = JSON.stringify({
            name: values.username,
            password: values.password,
            rolue,

        })

        localStorage.setItem('user', userInfo)
        window.history.go('/')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <p style={{ fontSize: 30, fontFamily: 'KaiTi' }}>图书管理系统登录</p>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

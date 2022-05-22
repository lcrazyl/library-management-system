import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import './index.css'
import { useNavigate } from "react-router-dom"; //路由跳转及路径
const { Header, Content, Sider } = Layout;
// const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
//     key,
//     label: `nav ${key}`,
// }));
const { SubMenu } = Menu;
function Index(props) {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user.name);
        }
    }, [])
    // let location = useLocation();
    const handleMenuItem = ({ key }) => {
        //跳转
        // if(key==='/'){
        //   props.logout()

        navigate(key);

    };
    useEffect(() => {
        const elementDom = document.querySelectorAll(".ant-menu-item");
        elementDom.forEach(item => {
            const d = item.innerHTML.split("/");
            const c = d[1].split('"');
            if (window.location.href.includes(c[0])) {
                item.classList.add('ant-menu-item-selected');
            } else {
                item.classList.remove('ant-menu-item-selected');
            }
        })

    })
    const handleQuit = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }
    const menuItems = [
        {
            key: 'user',
            label: '借阅图书',
            children: [
                {
                    key: '/',
                    label: '全部图书'
                },
                {
                    key: '/order',
                    label: '个人订单'
                },
                {
                    key: '/record',
                    label: '借阅记录'
                }
            ]
        },
        {
            key: 'admin',
            label: '图书与用户管理',
            children: [
                {
                    key: '/bookManagement',
                    label: '图书管理'
                },
                {
                    key: '/borrower',
                    label: '读者管理'
                },
                {
                    key: '/userManagement',
                    label: '用户管理'
                }
            ]
        },
        {
            key: 'superAdmin',
            label: '数据分析',
            children: [
                {
                    key: '/bookTypeAnalysis',
                    label: '图书分析'
                },
                {
                    key: '/userAnalysis',
                    label: '用户分析'
                },
            ]
        }
    ]
    return (
        <div className="layout">
            <Layout >
                <Header className="header">
                    <div className='userName'>
                        <p>{`欢迎：${user}`}</p>
                    </div>
                    <Button size='small' className='quit' ghost='true' onClick={handleQuit}>退出</Button>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={handleMenuItem}
                            items={menuItems}
                        >
                            {/* <SubMenu title="借阅图书" key='user'>
                                <Menu.Item key="/"><span name='/1'>全部图书</span></Menu.Item>
                                <Menu.Item key="/order"><span name='/1'>个人订单</span></Menu.Item>
                                <Menu.Item key="/record"><span name='/1'>借阅记录</span></Menu.Item>
                            </SubMenu>
                            <SubMenu title='图书与用户管理' key='admin'>
                                <Menu.Item key="/bookManagement"><span name='/1'>图书管理</span></Menu.Item>
                                <Menu.Item key="/borrower"><span name='/borrower'>读者管理</span></Menu.Item>
                                <Menu.Item key="userManagement"><span name='/userManagement'>用户管理</span></Menu.Item>
                            </SubMenu>
                            <SubMenu title='数据分析' key='superAdmin'>
                                <Menu.Item key="/bookTypeAnalysis"><span name='/bookTypeAnalysis'>图书分析</span></Menu.Item>
                                <Menu.Item key="userAnalysis"><span name='/userAnalysis'>用户分析</span></Menu.Item>
                            </SubMenu> */}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}

export default Index;



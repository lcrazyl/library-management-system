import Index from '../App';
import Books from '../components/Books/index'
import Order from '../components/Order/index'
import Record from '../components/Record/index'
import BookManagement from '../components/BookManagement/index'
import Login from '../components/Login/index';
import Borrower from '../components/Borrower/index'
import BookTypeAnalysis from '../components/BookTypeAnalysis/index'
import UserAnalysis from '../components/UserAnalysis/index'
import UserManagement from '../components/UserManagement';
import NotFound from '../components/NotFound/index'
import NotPermission from '../components/NotPermission/index'
import { useRoutes, useLocation } from 'react-router-dom';
/* 
* superAdmin:超级管理员可以看查所有
* admin：管理员可以除图书、永魂分析不可以
* user：只能看所有图书和个人中心
*/
const routes = [
    {
        path: '/',
        element: <Index />,
        children: [
            { path: '/', element: <Books />, roles: ['superAdmin', 'admin', 'user'] },
            { path: '/order', element: <Order />, roles: ['user'] },
            { path: '/record', element: <Record />, roles: ['user'] },
            { path: "/borrower", element: <Borrower />, roles: ['superAdmin', 'admin'] },
            { path: "/bookTypeAnalysis", element: <BookTypeAnalysis />, roles: ['superAdmin'] },
            { path: "/userAnalysis", element: <UserAnalysis />, roles: ['superAdmin'] },
            { path: "/bookManagement", element: <BookManagement />, roles: ['superAdmin', 'admin'] },
            { path: '/userManagement', element: <UserManagement />, roles: ['superAdmin', 'admin'] },

        ]
    },
    {
        path: '/login',
        element: <Login />

    },
    {
        path: "*",
        element: <NotFound />
    }

]

function ConfigRouter() {
    let user = JSON.parse(localStorage.getItem('user'));
    const { pathname } = useLocation();
    let Admin = [];
    const element = useRoutes(routes);
    if (user) {
        routes[0].children.forEach(item => {
            if (item.path === pathname) {
                Admin = item.roles
            }
        })
        if (Admin.includes(user.rolue)) {
            return element;
        } else {
            return <NotPermission />
        }

    } else {
        return <Login />;
    }
}
export default ConfigRouter;



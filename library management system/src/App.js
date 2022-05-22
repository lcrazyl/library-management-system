import React from 'react'
import { Outlet } from "react-router-dom";
import Layout from './components/Layouts/index'
export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>



  )
}

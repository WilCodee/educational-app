import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Navbar } from './Navbar';



export const SideBar = ({ children }) => {
  const { Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsedt] = useState(false)

  const onCollapse = collapsed => {
    setCollapsedt(collapsed)

  };
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>

              Cursos
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Materias
            <Link
                  className="navbar-brand"
                  to="subjects"
                >
                  Materias
                </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Usuarios">
              <Menu.Item key="3">
                <Link
                  className="navbar-brand"
                  to="students"
                >
                  Estudiantes
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link
                  className="navbar-brand"
                  to="teachers"
                >
                  Profesores
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>


        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>

        <Layout className="site-layout" style={{backgroundColor: 'white'}}>
          <Content >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>SISTEMA EDUCATIVO 2022</Footer>
        </Layout>
      </Layout>
    </>
  )
}

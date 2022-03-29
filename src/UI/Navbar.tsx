import React from 'react'
import { Menu, Layout, Image } from 'antd';
import { Link } from 'react-router-dom'
import LOGO from '../images/LOGOSCODE.png'
import {UserOutlined} from '@ant-design/icons';
export const Navbar = () => {
  const { SubMenu } = Menu;
  const { Header } = Layout;
  return (
    <>

      <Header className="site-layout-background" style={{ paddingLeft: 0 }} >
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Menu.Item >
              <img src={LOGO} style={{ width: 76,paddingLeft: 0 ,paddingRight: 0 }} />
            </Menu.Item>

          </Menu.Item>
          <Menu.Item key="2" style={{ marginLeft: 'auto' }}>

            Inicio

          </Menu.Item>
          <Menu.Item key="3">

            Reglamento
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Fernando">
              <Menu.Item key="4">
                  Perfil
              </Menu.Item>
              <Menu.Item key="5">
                  Opciones
              </Menu.Item>
              <Menu.Item key="6">
                  Salir
              </Menu.Item>
            </SubMenu>

        </Menu>
      </Header>
    </>
  )
}

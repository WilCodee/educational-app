import React, { useContext } from 'react'
import { Menu, Layout } from 'antd';
/* import LOGO from '../images/LOGOSCODE.png' */
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from 'src/context/AuthContext';
import { useNavigate } from 'react-router-dom';

import "../styles/NavBar.css";

export const Navbar = ({ menu }: any) => {
  const navigate = useNavigate()
  const { SubMenu } = Menu;
  const { Header } = Layout;
  const { logout, user } = useContext(AuthContext)
  const { firstName } = user.profile.fullName

  const fullLogout = () => {
    logout()
    localStorage.clear();
    navigate('/')
  }

  return (
    <>

      <Header className="site-layout-background" style={{ paddingLeft: 0 }} >
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Menu.Item >
              { JSON.parse(localStorage.getItem("institute") || "{name: aaaa}").name }
            </Menu.Item>

          </Menu.Item>
         
          <SubMenu key="sub1" icon={<UserOutlined />} title={firstName}
          style={{
            position:'absolute',
            right: 0
          }}
          >
            <Menu.Item key="6" onClick={fullLogout} >
              Salir
            </Menu.Item>
          </SubMenu>

        </Menu>
      </Header>
    </>
  );
};

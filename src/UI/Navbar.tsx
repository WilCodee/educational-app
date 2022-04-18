import React, { useContext, useState } from 'react'
import { Menu, Layout, Button, Drawer} from 'antd';
/* import LOGO from '../images/LOGOSCODE.png' */
import { BookOutlined, ExperimentOutlined, FolderOpenOutlined, MenuOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from 'src/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

import "../styles/NavBar.css";
import { ActionsContext } from 'src/context/AuthContext/ActionsContext/ActionsContext';

export const Navbar = ({ menu }:any) => {
  const navigate = useNavigate()
  const { SubMenu } = Menu;
  const { Header } = Layout;
  const { logout, user } = useContext(AuthContext)
  const { firstName } = user.profile.fullName

  const [visible, setVisible] = useState(false);
  const location = useLocation()
  const { setAction } = useContext(ActionsContext)

  const fullLogout = () => {
    logout()
    localStorage.clear();
    navigate('/')
  }

  const goToPage = (page:string) => {
    //Se valida que la ruta la que quiero ir es diferente a la de origen, sino no tiene sentido navegar ni reiniciar el state de items
    if(location.pathname !== page){
      
      setAction([])
      navigate(page)
    }
  }

  return (
    <>
      {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              
      <nav className="navbar">
        <Button
          className="menu"
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
        />
        <Drawer
          title="Topics"
          placement="left"
          //onClick={() => setVisible(false)}
          onClose={() => setVisible(false)}
          visible={visible}
        > 
          {menu}
        </Drawer>
      </nav>

      </Menu> */}
      <Header className="site-layout-background" style={{ paddingLeft: 0 }} >

       <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
     
        {/*<Menu.Item key="0" style={{ textAlignLast: 'right' }}>
          <Image
            width={70}
            src="NiceCode_Logo.png"
          />
        </Menu.Item>*/}
         <Menu.Item key="1">
           <Menu.Item >
           {/*<nav className="navbar">*/}
           <nav>
              <Button
                className="menu"
                type="primary"
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
              />
              <Drawer
                title="Menus"
                placement="left"
                //onClick={() => setVisible(false)}
                onClose={() => setVisible(false)}
                visible={visible}
              > 
                 <Menu defaultSelectedKeys={['1']} mode="inline">
                    {user.isAdmin && (
                      <>
                      <Menu.Item key="1" icon={<FolderOpenOutlined />} 
                      className="navbar-brand"
                      onClick={() => goToPage("/courses") }>
                        Cursos
                      </Menu.Item>
                      <Menu.Item key="2" icon={<ExperimentOutlined />} className="navbar-brand"
                        onClick={() => goToPage("/subjects") }
                      >
                      
                            Materias
                      </Menu.Item>
                   
                      <Menu.Item key="3" icon={<BookOutlined />} className="navbar-brand"
                        onClick={() => goToPage("/students") } >
                          
                            Estudiantes
                        
                      </Menu.Item>

                      <Menu.Item key="4" icon={<TeamOutlined />} className="navbar-brand"
                        onClick={() => goToPage("/teachers") } >
                          
                            Profesores
                        
                        </Menu.Item>
            
                     
                      </>
                    )}
                    {user.isTeacher && (
                      <>
                      <SubMenu key="sub1" icon={<UserOutlined />} title="Usuarios">
                        <Menu.Item key="3" icon={<BookOutlined />} className="navbar-brand"
                        onClick={() => goToPage("/students") } >
                            Estudiantes
                        </Menu.Item>
                      </SubMenu>
                      </>
                    )}
                    {user.isStudent && (
                      <>
                      <Menu.Item key="1" icon={<BookOutlined />} className="navbar-brand"
                      onClick={() => goToPage("/courses") }>
                        Cursos
                      </Menu.Item>
                      </>
                    )}
                    </Menu>

              </Drawer>
            </nav>
           </Menu.Item>

         </Menu.Item>
         <Menu.Item key="2" style={{ marginLeft: 'auto' }}>

           Inicio

         </Menu.Item>
         <Menu.Item key="3">

           Reglamento
         </Menu.Item>
         <SubMenu key="sub1" icon={<UserOutlined />} title={firstName}>
           
           <Menu.Item key="4">
             Perfil
           </Menu.Item>
           <Menu.Item key="5">
             Opciones
           </Menu.Item>
           <Menu.Item key="6" onClick={fullLogout} >
             Salir
           </Menu.Item>
         </SubMenu>

       </Menu>
 
      </Header>
  
    </>
  );
};

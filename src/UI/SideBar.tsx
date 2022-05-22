import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  BookOutlined,
  ExperimentOutlined,
  FolderOpenOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ActionsContext } from "src/context/AuthContext/ActionsContext/ActionsContext";
import { AuthContext } from "src/context/AuthContext";

export const SideBar = ({ children }: any) => {
  const { Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsedt] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAction } = useContext(ActionsContext);

  const onCollapse = (collapsed: boolean) => setCollapsedt(collapsed);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("DATOS DEL USUARIO", user);
  }, []);

  const goToPage = (page: string) => {
    //Se valida que la ruta la que quiero ir es diferente a la de origen, sino no tiene sentido navegar ni reiniciar el state de items
    if (location.pathname !== page) {
      setAction([]);
      navigate(page);
    }
  };
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            {user.isAdmin && (
              <>
                <Menu.Item
                  key="1"
                  icon={<FolderOpenOutlined />}
                  className="navbar-brand"
                  onClick={() => goToPage("/courses")}
                >
                  Cursos
                </Menu.Item>
                <Menu.Item
                  key="2"
                  icon={<ExperimentOutlined />}
                  className="navbar-brand"
                  onClick={() => goToPage("/subjects")}
                >
                  Materias
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="Usuarios">
                  <Menu.Item
                    key="3"
                    className="navbar-brand"
                    onClick={() => goToPage("/students")}
                  >
                    Estudiantes
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    className="navbar-brand"
                    onClick={() => goToPage("/teachers")}
                  >
                    Profesores
                  </Menu.Item>
                </SubMenu>
              </>
            )}
            {user.isTeacher && (
              <>
                <Menu.Item
                  key="1"
                  icon={<FolderOpenOutlined />}
                  className="navbar-brand"
                  onClick={() => goToPage("/courses")}
                >
                  Cursos
                </Menu.Item>
              </>
            )}
            {user.isStudent && (
              <>
                <Menu.Item
                  key="1"
                  icon={<BookOutlined />}
                  className="navbar-brand"
                  onClick={() => goToPage("/courses")}
                >
                  Cursos
                </Menu.Item>
              </>
            )}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Layout
              className="site-layout"
              style={{ backgroundColor: "white" }}
            >
              <Content>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  {children}
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                SISTEMA EDUCATIVO 2022 <br /> Hecho con ❤ por NiceCode
              </Footer>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

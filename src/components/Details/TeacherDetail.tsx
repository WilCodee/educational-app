import React, { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { Tabs, Row, Col, Image } from 'antd';
import { UserOutlined,AuditOutlined,SnippetsOutlined } from '@ant-design/icons';
import moment from 'moment';

const TeacherDetail = () => {
  const { data }: any = useContext(ModalContext);
  const { profile } = data

  const { TabPane } = Tabs;

  return (
    <div>
      {(typeof data !== "undefined" && 'profile' in data) &&
        (<>
          <Row>
            <Col span={6} >
              <Image
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col span={1} >
            </Col>
            <Col span={17} >
              <h1>{(data.profile.fullName?.firstName ?? "") + " " + (data.profile.fullName?.lastName ?? "")}</h1>
              <h3>{profile?.area}</h3>
            </Col>

          </Row>
          <Tabs defaultActiveKey="1" >
            <TabPane tab={<><SnippetsOutlined /> Datos Personales</>} key="1">
              <Row>
                <Col span={12} >
                  <h2>CEDULA DE IDENTIDAD</h2>
                  <p>{profile?.ci}</p>
                </Col>
                <Col span={12} >
                  <h2>EDAD</h2>
                  <p>{profile?.age}</p>
                  <br />
                </Col>
               
                <Col span={12} >
                  <h2>FECHA DE ADMISION</h2>
                  <p>{moment(profile?.admissionDate).format('L')}</p>
                </Col>
                <Col span={12} >
                  <h2>CELULAR</h2>
                  <p>{profile?.phoneNumber?.number}</p>
                </Col>
                <br />
                <br />
              </Row>
            </TabPane>
            <TabPane tab={<><UserOutlined /> Cuenta</>} key="2">
              <h2>EMAIL</h2>
              <p>{data?.email}</p>
            </TabPane>
            <TabPane tab={<><AuditOutlined /> Observaciones</>} key="3">

            </TabPane>
          </Tabs>
        </>
        )

      }


    </div>
  )
}

export default TeacherDetail; 
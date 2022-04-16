import React, { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { Tabs, Row, Col, Image } from 'antd';
import { TeamOutlined, AuditOutlined, SnippetsOutlined } from '@ant-design/icons';
import moment from 'moment';

const StudentDetail = () => {
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
              <h3>{data?.email}</h3>
            </Col>

          </Row>
          <Tabs defaultActiveKey="1" >
            <TabPane tab={<><SnippetsOutlined /> Datos Estudiante</>} key="1">
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
                  <br />
                </Col>
                <Col span={12} >
                  <h2>TIPO DE SANGRE</h2>
                  <p>{profile?.bloodType}</p>
                </Col>
                <br />
                <br />
              </Row>
            </TabPane>
            <TabPane tab={<><TeamOutlined />Datos Representante</>} key="2">
              <Row>
                <Col span={12} >
                  <h2>NOMBRE</h2>
                  <p>{(profile.representative.fullName?.firstName ?? "") + " " + (profile.representative.fullName?.lastName ?? "")}</p>
                </Col>
                <Col>
                <h2>TELEFONO</h2>
                <p>{profile.representative.phoneNumber.number}</p>
                </Col>

              </Row>

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

export default StudentDetail; 
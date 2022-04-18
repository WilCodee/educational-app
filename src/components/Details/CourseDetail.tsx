import React, { useContext } from 'react'
import { ModalContext } from 'src/context/ModalContext';
import { Row, Col } from 'antd';
import moment from 'moment';
export const CourseDetail = () => {
    const { data }: any = useContext(ModalContext);
    const { name, startDate, endDate } = data
    return (
        <>
            <h1>{name}</h1>
            <Row>
                <Col span={12} >
                    <h2>FECHA DE INICIO</h2>
                    {moment(startDate).format('L')}
                </Col>
                <Col span={12} >
                    <h2>FECHA DE FINALIZACION</h2>
                    {moment(endDate).format('L')}
                </Col>
            </Row>
        </>
    )
}

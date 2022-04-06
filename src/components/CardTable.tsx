import React, { useState } from 'react'
import { Button, Card } from 'antd';
import { ModalDefault } from './ModalDefault';
import { SubjectForm } from './SubjectForm';

interface ICardTableProps {
    title: string;
    AddText: string;
    children: any
}

export const CardTable = ({ title, AddText, children }: ICardTableProps) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoadign] = useState(false)
    const showModal = () => {
        setVisible(true)
        

      };
    
      const handleOk = () => {
    
        setLoadign(true)
        setTimeout(() => {
          setLoadign(false)
          setVisible(false)
          
    
        }, 1000);
      };
    
      const handleCancel = () => {
        setVisible(false)
      };
    
    return (
        <>
            <div className="site-card-border-less-wrapper ">
                <Card
                    title={title}
                    extra={<Button onClick={showModal} type="primary">+ AGREGAR {AddText}</Button>}>
                    {children}
                </Card>
                <ModalDefault ModalTitle="AGREGAR MATERIA" visibleValue={visible} loading={loading} handleOk={handleOk} handleCancel={handleCancel} >
                    <SubjectForm />
                </ModalDefault>
            </div>
        </>
    )
}

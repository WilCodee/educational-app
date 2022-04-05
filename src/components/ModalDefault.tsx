import React from 'react'
import { Modal, Button,Popconfirm,message } from 'antd';



export const ModalDefault = ({ ModalTitle,visibleValue, loading, handleOk ,handleCancel, children}) => {
    
    const cancel = (e) => {
        console.log(e);
        message.error('Cancelaste la operacion');
      }

    return (
        <>
            <Modal
                visible={visibleValue}
                title={ModalTitle}

                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Popconfirm
                    title="Seguro que quieres cancelar el envio"
                    okText="Si"
                    cancelText="No"
                    onConfirm={handleCancel}
                    onCancel={cancel}

                  >
                    <Button key="back" >
                        Cancelar
                    </Button>
                    </Popconfirm>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk} >
                        LOADING
                    </Button>,
                ]}
            >
                {children}
            </Modal>
        </>
    )
}

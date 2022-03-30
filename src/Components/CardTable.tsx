import React from 'react'
import { Button, Card } from 'antd';

export const CardTable = ({ title,AddText ,children}) => {
    
    return (
        <>
            <div className="site-card-border-less-wrapper ">
                <Card className='card' title={
                    <>
                    
                    <Button type="primary">+ AGREGAR {AddText}</Button>
                    </>
                    } >
                {children}
                </Card>
            </div>
        </>
    )
}

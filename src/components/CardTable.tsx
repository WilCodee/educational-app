import React from 'react'
import { Button, Card } from 'antd';

interface ICardTableProps {
    title: string;
    AddText: string; 
    children: any
}

export const CardTable = ({ title,AddText ,children}:ICardTableProps) => {
    
    return (
        <>
            <div className="site-card-border-less-wrapper ">
                <Card 
                title={title} 
                extra={<Button type="primary">+ AGREGAR {AddText}</Button>}>
                {children}
                </Card>
            </div>
        </>
    )
}

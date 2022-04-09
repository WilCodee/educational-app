import React from 'react'
import { Button, Card } from 'antd';

interface ICardTableProps {
    title: string;
    AddText: string;
    AddOnClick: () => void;
    children: any
}

export const CardTable = ({ title, AddText, AddOnClick, children }: ICardTableProps) => {
    return (
        <>
            <div className="site-card-border-less-wrapper ">
                <Card
                    title={title}
                    extra={<Button type="primary" onClick={AddOnClick} >+ Agregar {AddText}</Button>}>
                    {children}

                </Card>
            </div>
        </>
    )
}

import React, { useContext } from 'react'
import { Button, Card } from 'antd';
import { AuthContext } from 'src/context/AuthContext';

interface ICardTableProps {
    title: string;
    AddText: string;
    AddOnClick: () => void;
    children: any
}

export const CardTable = ({ title, AddText, AddOnClick, children }: ICardTableProps) => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <div className="site-card-border-less-wrapper ">
                <Card
                    title={title}
                    extra={
                        user.isAdmin && (
                    <Button type="primary" onClick={AddOnClick} >+ Agregar {AddText}</Button>
                    )
                    }>
                    {children}

                </Card>
            </div>
        </>
    )
}

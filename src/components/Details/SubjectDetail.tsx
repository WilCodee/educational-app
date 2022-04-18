import React, { useContext } from 'react'
import { ModalContext } from 'src/context/ModalContext';

export const SubjectDetail = () => {
  const { data }: any = useContext(ModalContext);
  const { name,description } = data
  return (
    <>
    <h1>{name}</h1>
    <h2>DESCRIPCION</h2>
    <p>{description}</p>
    </>
  )
}

import { Button, Card, Modal, Popconfirm, Select, Skeleton, Table } from 'antd'
import React, { useState, useEffect, useContext } from 'react'
import ActivityForm from 'src/components/Forms/ActivityForm'
import { AuthContext } from 'src/context/AuthContext'
import { getData } from 'src/services/fetch/getData'
import { deleteData } from 'src/services/fetch/deleteData'
import moment from 'moment'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { message } from 'antd'
const { Option } = Select

const ActivitiesPage = () => {
  const { user } = useContext(AuthContext)
  const [courses, setCourses] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState('ADD')
  const [filteredById, setFilteredById] = useState<string>()
  const [reFetchActivities, setReFetchActivities] = useState(false)
  const [initialDataUpdateModal, setInitialDataUpdateModal] = useState({})

  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Fecha de Cierre',
      dataIndex: 'closeDate',
      key: 'closeDate',
      render: (item: any) => (
        <span>{`${moment(item).format('MMMM Do YYYY, h:mm:ss a')}`}</span>
      ),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (item: any) => (
        <>
          <EditOutlined onClick={() => handleUpdateActivity(item)} />
          {'  '}
          <Popconfirm
            title='Estas seguro que desea Eliminar esta Actividad?'
            onConfirm={() => handleDeleteActivity(item._id)}
            okText='Si'
            cancelText='No'
          >
            <DeleteOutlined />
          </Popconfirm>
        </>
      ),
    },
  ]

  const initialRequest = async () => {
    setLoading(true)
    let request = await getData(`courses_by_teacher/${user._id}`)
    if (request.status) {
      const coursesToTable = request.courses.map((course: any) => {
        course.key = course['_id']
        return course
      })
      setCourses(coursesToTable)
      setLoading(false)
    }
  }

  const getActivities = async () => {
    const request = await getData(`/course/${filteredById}/activities`)
    if (request.status) {
      const activitiesToTable = request.activities.map((course: any) => {
        course.key = course['_id']
        return course
      })
      setActivities(activitiesToTable)
    }
  }

  useEffect(() => {
    initialRequest()
  }, [])

  useEffect(() => {
    getActivities()
    setReFetchActivities(false)
  }, [filteredById, reFetchActivities])

  const handleAddActivity = () => {
    setShowModal(true)
    setMode('ADD')
  }

  const handleUpdateActivity = (initialData: any) => {
    setInitialDataUpdateModal(initialData)
    setShowModal(true)
    setMode('UPDATE')
  }

  const handleDeleteActivity = async (_id: string) => {
    const request = await deleteData(`/activities/${_id}`)
    if (request.status) {
      setReFetchActivities(true)
      message.info(request.message)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    setMode('ADD')
  }

  const onSelect = (value: string) => {
    setFilteredById(value)
  }

  return (
    <Card
      title='Actividades'
      extra={
        <Button type='primary' onClick={handleAddActivity}>
          Crear actividad
        </Button>
      }
    >
      {loading ? (
        <Skeleton />
      ) : (
        <div>
          <span>
            Filtrar por:{' '}
            <Select placeholder='Seleccionar curso' onChange={onSelect}>
              {courses.map((course: any) => (
                <Option value={course._id}>{course.name}</Option>
              ))}
            </Select>
          </span>
          <br />
          <br />
          <div>
            <Table columns={columns} dataSource={activities} />
          </div>

          {showModal && (
            <Modal
              title={
                mode === 'ADD' ? 'Nueva Actividad' : 'Actualizar Actividad'
              }
              visible={showModal}
              footer={null}
              onCancel={handleCancel}
            >
              <ActivityForm
                setReFetch={setReFetchActivities}
                mode={mode}
                courses={courses}
                data={initialDataUpdateModal}
              />
            </Modal>
          )}
        </div>
      )}
    </Card>
  )
}

export default ActivitiesPage

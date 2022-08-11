import { Button, Card, Modal, Select, Skeleton, Table } from 'antd'
import React, { useState, useEffect, useContext } from 'react'
import ActivityForm from 'src/components/Forms/ActivityForm'
import { AuthContext } from 'src/context/AuthContext'
import { getData } from 'src/services/fetch/getData'
import moment from 'moment'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
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
      render: () => {
        return (
          <>
            <EditOutlined onClick={handleUpdateActivity} />
            {'  '}
            <DeleteOutlined />
          </>
        )
      },
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

  const handleUpdateActivity = () => {
    setShowModal(true)
    setMode('UPDATE')
  }

  const handleCancel = () => {
    setShowModal(false)
    setMode('ADD')
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
            Filtrar por:
            <Select
              placeholder='Seleccionar curso'
              onSelect={(value: string) => {
                setFilteredById(value)
              }}
            >
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
                data={mode === 'ADD' ? {} : {}}
              />
            </Modal>
          )}
        </div>
      )}
    </Card>
  )
}

export default ActivitiesPage

import { ICourse } from "../interfaces/ICourse";

export const CoursesMocks:ICourse[] = [
    {
        _id: 'curso-1',
        name: 'Curso A',
        startDate: new Date(),
        endDate: new Date(),
        students: [ 'est-1', 'est-2'],
        schedule: [
            {
                topic: 'materia-1',
                teacher: 'profesor-1',
                days: [
                    {
                        name: 'Lunes',
                        startTime: '15:30',
                        endTime: '17:30',
                    },
                    {
                        name: 'Martes',
                    },
                    {
                        name: 'Miércoles',
                    },
                    {
                        name: 'Jueves',
                    },
                    {
                        name: 'Viernes',
                        startTime: '15:30',
                        endTime: '17:30'
                    }
                ]
            },
          
        ],
        assistance: [
            {
                student: 'est-1',
                days: [
                    {
                        date: new Date(),
                        value: 'V'
                    },
                    {
                        date: new Date(),
                        value: 'F'
                    }
                ]
            }
        ],
        grades: [
            {
                student: 'est-1',
                grades: [
                    {
                        name: 'Deber sobre fracciones',
                        value: 8.5
                    }
                ],
                average: 8
            }
        ]  
    },
    {
        _id: 'curso-2',
        name: 'Curso B',
        startDate: new Date(),
        endDate: new Date(),
        students: [ 'est-1', 'est-2', 'est-3'],
        schedule: [
            {
                topic: 'materia-1',
                teacher: 'profesor-1',
                days: [
                    {
                        name: 'Lunes',
                        startTime: '15:30',
                        endTime: '17:30'
                    },
                    {
                        name: 'Martes',
                    },
                    {
                        name: 'Miércoles',
                        startTime: '15:30',
                        endTime: '17:30'
                    },
                    {
                        name: 'Jueves',
                    },
                    {
                        name: 'Viernes',
                        
                    }
                ]
            },
          
        ],
        assistance: [
            {
                student: 'est-1',
                days: [
                    {
                        date: new Date(),
                        value: 'V'
                    },
                    {
                        date: new Date(),
                        value: 'F'
                    }
                ]
            }
        ],
        grades: [
            {
                student: 'est-1',
                grades: [
                    {
                        name: 'Deber sobre fracciones',
                        value: 8.5
                    }
                ],
                average: 10
            }
        ]  
    }
]
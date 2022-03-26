export interface IAssistanceRecord {
    student: string; //id ref del estudiante
    days: IAssistanceDay; 
}

export interface IAssistanceDay {
    date: Date; 
    value: string; //esta propiedad indicará el estado de la asistencia en ese día (F, V, etc..)
}
export interface IAssistanceRecord {
    student: string; //id ref del estudiante
    days: IAssistanceDay[]; 
}

export interface IAssistanceDay {
    date: Date; 
    value: string; //esta propiedad indicará el estado de la asistencia en ese día (F, V, etc..)
}

/*ASSISTANCE
ESTUDIANTE 27-03  28-03   29-03
PABLO       A       F      T
JONATHAN    A       A      A
*/

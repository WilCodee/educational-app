export interface IScheduleRecord {
    topic: string; //id de materia
    teacher: string; //id de profesor
    days: IClassDay[]; 
};

export interface IClassDay{
    name: string; //lun, mar, mier, jue, vier 
    time?: string | Date //la hora a la que empieza una clase, es opcional porque no es obligatorio que todos los dias se tenga clase de esa materia
}
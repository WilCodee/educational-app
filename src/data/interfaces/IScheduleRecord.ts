export interface IScheduleRecord {
    topic: string; //id de materia
    teacher: string; //id de profesor
    days: IScheduleDay[]; 
};

export interface IScheduleDay{
    name: string; //lun, mar, mier, jue, vier 
    startTime?: string | Date //la hora a la que empieza una clase, es opcional porque no es obligatorio que todos los dias se tenga clase de esa materia
    endTime?: string | Date
}

// SCHEDULE //
/*
MATERIA  PROFESOR      L        M      MI   J  V
MATE    JULIO ESTRADA 08 a 10
LENGUA  JUANITA ALVEZ          09 a 11
*/
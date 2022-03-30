export interface IGradeRecord {
    student: string; //id ref del estudiante
    grades: IGrade[];
    average: number; 
}

export interface IGrade {
    name: string; //nombre de la nota, ejemplos "Deber sobre fracciones, Prueba bimestral, etc..",
    value: number; //la calificación
}

/*
NOTAS
ESTUDIANTE NOTA 1 NOTA 2 NOTA 3  PROMEDIO 
Pablo       8       8     10        8.3

*/
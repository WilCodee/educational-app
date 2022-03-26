export interface IGradeRecord {
    student: string; //id ref del estudiante
    grades: IGrade[]; 
}

export interface IGrade {
    name: string; //nombre de la nota, ejemplos "Deber sobre fracciones, Prueba bimestral, etc..",
    value: number; //la calificación
}
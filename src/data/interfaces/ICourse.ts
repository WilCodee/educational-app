import { IAssistanceRecord } from "./IAssistanceRecord";
import { IGradeRecord } from "./IGradeRecord";
import { IScheduleRecord } from "./IScheduleRecord";
import { IStudent } from "./IStudent";

export interface ICourse {
    _id: string; 
    name: string;
    startDate: Date;
    endDate: Date; 
    students: string[] | IStudent[]; //un array de los ids de los estudiantes o un aray de estudiantes
    schedule: IScheduleRecord[];
    assistance: IAssistanceRecord[]; 
    grades: IGradeRecord[];
}
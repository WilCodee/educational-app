import { IAssistanceRecord } from "./IAssistanceRecord";
import { IGradeRecord } from "./IGradeRecord";
import { IScheduleRecord } from "./IScheduleRecord";

export interface ICourse {
    name: string;
    startDate: Date;
    endDate: Date; 
    students: string[]; //un array de los ids de los estudiantes 
    schedule: IScheduleRecord[];
    assistance: IAssistanceRecord[]; 
    grades: IGradeRecord[];
}
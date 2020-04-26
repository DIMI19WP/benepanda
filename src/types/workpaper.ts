import Moment from 'moment';

export type Subject = |'전체'|'국어'|'수학'|'영어'|'한국사'|'물리1'|'화학1'|'통합과학'|'공업일반'|'기초제도'|'회계원리'|'상업경제'|'통합사회'

export interface Workpaper {
    examTitle: string;
    subject: Subject;
    register: string;
    questionQuantity: number;
    endedAt: Moment.Moment;
    originYear?: number;
    originFrom?: string;
    startedAt?: Moment.Moment;
}

import Moment from 'moment';

export type Subject = |'전체'|'국어'|'수학'|'영어'|'한국사'|'물리1'|'화학1'|'통합과학'|'공업일반'|'기초제도'|'회계원리'|'상업경제'|'통합사회'

export type Paper = {
    paperTitle: string;
    subject: Subject;
    register: string;
    questionQuantity: number;
    endedAt: Moment.Moment;
    originYear?: number;
    originFrom?: string;
    startedAt: Moment.Moment;
    paperId: string;
    rightQuantity?: number;
}

export type Question = {
    Table01: {
        QST_ID: number;
        QST_HTML: string;
        QST_CMT_HTML: string;
        EXE_HTML: string;
        EXE_CMT_HTML: string;
        EXE_RANGE: string;
        QST_CORRECT: string;
        QST_CORR_RATE?: string;
     }[];
    Table02: [
        {
            IBT_ID: number;
            IBT_TYPE: string;
            IBT_NAME: string;
            SBJ_CODE: string;
            SBJ_NAME: Subject;
        }
    ];
    UserName: string;
    IBT_PRINT_TYPE: string;
}

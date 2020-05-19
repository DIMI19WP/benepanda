import api from 'functions/request';
import { Question } from 'types/paper';

export default async (paperId: string): Promise<string> => {
  const formdata = new FormData();
  formdata.append('type', 'ymWuGYYSOfmJLRPkt3xlfw{e}{e}');
  formdata.append('values[]', paperId);
  formdata.append('type', 'ymWuGYYSOfmJLRPkt3xlfw{e}{e}');
  const fetched = await api('/Utils/TestPrint', {
    method: 'POST',
    body: formdata,
  });
  const questionData: Question = JSON.parse(fetched.value);
  console.log(questionData.Table01[0].EXE_HTML);
  return fetched.value;
};

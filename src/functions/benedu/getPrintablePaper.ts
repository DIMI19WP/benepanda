import api from 'functions/request';
import { Paper } from 'types/paper';

export default async (paperId: string): Promise<Paper> => {
  const formdata = new FormData();
  formdata.append('type', 'ymWuGYYSOfmJLRPkt3xlfw{e}{e}');
  formdata.append('values[]', paperId);
  formdata.append('type', 'ymWuGYYSOfmJLRPkt3xlfw{e}{e}');
  const fetched = await api('/Utils/TestPrint', {
    method: 'POST',
    body: formdata,
  });
  const questionData: Paper = JSON.parse(fetched.value);
  return questionData;
};

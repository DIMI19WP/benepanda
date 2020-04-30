import api from 'functions/request';
import getTestDetail from 'functions/benedu/getPaperPageIds';
import { Question } from 'types/paper';

export default async (paperId: string): Promise<string> => {
  const pageIds = await getTestDetail(paperId);

  const formdata = new FormData();
  formdata.append('type', 'ymWuGYYSOfmJLRPkt3xlfw{e}{e}');
  pageIds.forEach((pageId, index) => {
    formdata.append(`values[${index}][value]`, paperId);
    formdata.append(`values[${index}][detailvalue]`, pageId);
  });
  const fetched = await api('/Utils/TestDetailPrint', {
    method: 'POST',
    body: formdata,
  });
  const questionData: Question = JSON.parse(fetched.value);
  console.log(questionData.Table01[0].EXE_HTML);
  return fetched.value;
};

import api from 'functions/request';
import HTMLParser from 'fast-html-parser';
import { Workpaper, Subject } from 'types/workpaper';
import Moment from 'moment';

// import { ROOT_URI } from 'types/constants';

export default async (): Promise<Workpaper[]> => {
  const fetched = await api('/StudentStudy/TaskListList');
  const DOM = HTMLParser.parse(fetched.value);
  return DOM.querySelectorAll('#TaskList-table tbody tr').map((workpaper) => {
    const [, , , ,,
      subject, ,
      register, ,
      examTitle, ,
      questionQuantity, ,
      state, , , , , , , , , ,
      startedAt, ,
      endedAt] = workpaper.childNodes.map((e) => e.rawText.trim());
    return {
      subject: subject as Subject,
      register,
      examTitle,
      questionQuantity: Number(questionQuantity),
      state,
      endedAt: Moment(endedAt),
      startedAt: Moment(startedAt),
    };
  }).filter((e) => e.state !== '응시완료');
};

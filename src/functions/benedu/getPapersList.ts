import api from 'functions/request';
import HTMLParser from 'fast-html-parser';
import { Paper, Subject } from 'types/paper';
import Moment from 'moment';

// import { ROOT_URI } from 'types/constants';

export default async (): Promise<Paper[]> => {
  const fetched = await api('/StudentStudy/TaskListList');
  const DOM = HTMLParser.parse(fetched.value);
  return DOM.querySelectorAll('#TaskList-table tbody tr').map((paper) => {
    const [, , , ,,
      subject, ,
      register, ,
      paperTitle, ,
      questionQuantity,,, ,
      solvedQuantity, , , , , , , ,
      startedAt, ,
      endedAt] = paper.childNodes.map((e) => e.rawText.trim());
    return {
      subject: subject as Subject,
      register,
      paperTitle,
      questionQuantity: Number(questionQuantity),
      solvedQuantity: Number(solvedQuantity),
      state: ({
        'RX7CEmFfgzL6gqCunDqojQ{e}{e}': '미 응시',
        'ymWuGYYSOfmJLRPkt3xlfw{e}{e}': '응시중',
        'qlsPgUs{s}pzrJXatST3V3RA{e}{e}': '응시 완료',
      })[(paper.attributes.sts as |'RX7CEmFfgzL6gqCunDqojQ{e}{e}' |'ymWuGYYSOfmJLRPkt3xlfw{e}{e}' |'qlsPgUs{s}pzrJXatST3V3RA{e}{e}')],
      endedAt: Moment(endedAt),
      startedAt: Moment(startedAt),
      paperId: paper.attributes.value,
    };
  }).filter((e) => e.solvedQuantity !== e.questionQuantity);
};

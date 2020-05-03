import api from 'functions/request';
import HTMLParser from 'fast-html-parser';
import { Paper, Subject } from 'types/paper';
import Moment from 'moment';

// import { ROOT_URI } from 'types/constants';

export default async (): Promise<Paper[]> => {
  const fetched = await api('/StudentStudy/TaskListList');
  /* const fetched = {
    value: `


  <table id="TaskList-table">
      <tbody>
          <tr value="vRwsRt5aE9frMfuQz6qJ5A{e}{e}" sts="qlsPgUs{s}pzrJXatST3V3RA{e}{e}" class="  complete  ">

              <td class="center" name="check">
                  <label class="pos-rel">
                      <input type="checkbox" class="ace" />
                      <span class="lbl"></span>
                  </label>
              </td>
              <td class="center">1</td>
              <td class="center">국어</td>
              <td class="center">함지연</td>
              <td>2020년 4월 디미고 모의고사 1학년 국어</td>
              <td class="center">45</td>

              <td class="center">응시완료</td>
              <td class="center">45</td>
              <td class="center">37</td>
              <td class="center">2020-04-09</td>

              <td class="center">76:46</td>
              <td class="center">2020-04-09 09:30</td>
              <td class="center">2020-04-30 10:50</td>
          </tr>
      </tbody>
  </table>
  `,
  }; */
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
  });/* .filter((e) => e.solvedQuantity !== e.questionQuantity); */
};

import api from "functions/request";
import HTMLParser from "fast-html-parser";
import { BriefPaper, Subject } from "types/paper";
import Moment from "moment";

const getGeneratedExam = async (): Promise<BriefPaper[]> => {
  const fetched = await api("/StudentStudy/TestListList");
  const DOM = HTMLParser.parse(fetched.value);
  return (DOM.querySelectorAll("#TestList-table tbody tr").map((exam) => {
    const [, , , , , subject, , paperTitle, , questionQuantity, , , , , , , , , , , , startedAt] = exam
      .childNodes
      .map((e) => e.rawText
        .trim());
    return ({
      subject: (subject as Subject),
      paperTitle,
      questionQuantity: +questionQuantity,
      startedAt: Moment(startedAt),
      paperId: exam.attributes.value,
    });
  }));
};

export default getGeneratedExam;

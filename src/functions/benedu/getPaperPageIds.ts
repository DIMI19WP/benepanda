import api from "functions/request";
import HTMLParser from "fast-html-parser";

export default async (paperId: string): Promise<string[]> => {
  const formdata = new FormData();
  formdata.append("value", paperId);
  formdata.append("type", "3104jPV6524rCGsSRjjVsA{e}{e}");
  const fetched = await api("/StudentStudy/TestDetail", {
    method: "POST",
    body: formdata,
  });
  const DOM = HTMLParser.parse(fetched.value);
  return (DOM.querySelectorAll("#TestDetail-table tbody tr").map((page) => (page.attributes.detailvalue)));
};

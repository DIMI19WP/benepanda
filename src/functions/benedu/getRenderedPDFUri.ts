import getPrintablePaper from './getPrintablePaper';

export default async (paperId: string): Promise<string> => {
  const printablePaper = await getPrintablePaper(paperId);
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const { filename } = await ((await fetch('http://192.168.35.76:8080/renderPdf', {
    method: 'POST',
    body: JSON.stringify(printablePaper),
    headers: myHeaders,
  })).json());
  console.log(filename);
  return filename;
};

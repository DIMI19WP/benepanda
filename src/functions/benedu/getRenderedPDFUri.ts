import { renderedPDF } from 'types/paper';
import getPrintablePaper from './getPrintablePaper';

export default async (paperId: string): Promise<renderedPDF> => {
  const printablePaper = await getPrintablePaper(paperId);
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  try {
    const fetched = (await fetch('https://benepanda-renderer-cloud-run-7qmdkh3zkq-uc.a.run.app/renderPdf', {
      method: 'POST',
      body: JSON.stringify(printablePaper),
      headers: myHeaders,
    }));
    return (await fetched.json());
  } catch (e) {
    throw e;
  }
};

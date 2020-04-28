import React from 'react';
import { Text } from 'react-native';
import getTestDetail from 'functions/benedu/getTestPages';
import { Paper } from 'types/paper';
import { BottomSheetContentWrapper, PaperTitle } from './styleds';

export default ({ paper }: {paper?: {
    title: string;
    paperId: string;
};}) => {
  if (!paper) return <></>;
  getTestDetail(paper.paperId);
  return (
    <BottomSheetContentWrapper>
      <PaperTitle>{paper?.title}</PaperTitle>
    </BottomSheetContentWrapper>
  );
};

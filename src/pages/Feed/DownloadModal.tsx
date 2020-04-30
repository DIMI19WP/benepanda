import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import getPagesQuestions from 'functions/benedu/getPagesQuestions';
import { Paper, Question } from 'types/paper';
import {
  BottomSheetContentWrapper, PaperTitle, PositiveButtonWrapper, PositiveButton,
  PDFLoader, Horizontal, DownloadConfig, ConfigWrapper, ConfigKey, ConfigValue,
} from './styleds';

export default ({ paper }: {paper?: {
    title: string;
    paperId: string;
};}): JSX.Element => {
  const [questionData, setQuestionData] = useState<Question>();
  const [numFocus, focusAtNum] = useState(true);
  useEffect(() => {
    (async () => {
      if (!paper) return;
      (await getPagesQuestions(paper.paperId));
    })();
  }, []);
  if (!paper) return <></>;
  return (
    <BottomSheetContentWrapper>
      <PaperTitle>{paper?.title}</PaperTitle>
      <Horizontal>
        <PDFLoader
          source={{ uri: 'https://rycont.imfast.io/%EA%B5%90%EA%B3%BC%EC%84%9C/%EC%88%98%ED%95%99%28%EC%83%81%29%20-%20%EC%9D%B4%EC%A4%80%EC%97%B4.pdf' }}
        />
        <DownloadConfig style={{ flex: 1 }}>
          <View style={{ flex: 1 }} />
          <ConfigWrapper>
            <ConfigKey>글꼴</ConfigKey>
            <ConfigValue returnKeyType="go" onEndEditing={() => focusAtNum(true)} />
          </ConfigWrapper>
          <ConfigWrapper>
            <ConfigKey>글자 크기</ConfigKey>
            <ConfigValue keyboardType="number-pad" />
          </ConfigWrapper>
          <PositiveButtonWrapper>
            <PositiveButton>
              내려받기
            </PositiveButton>
          </PositiveButtonWrapper>
        </DownloadConfig>
      </Horizontal>
    </BottomSheetContentWrapper>
  );
};

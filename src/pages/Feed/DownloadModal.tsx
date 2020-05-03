import React, { useState, useEffect } from 'react';
import { View, ToastAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import Button from 'components/button';
import {
  BottomSheetContentWrapper, PaperTitle,
  PDFLoader, Horizontal, DownloadConfig, ConfigWrapper, ConfigKey, ConfigValue,
} from './styleds';

export default ({ paper }: {paper?: {
    title: string;
    paperId: string;
};}): JSX.Element => {
  const [pdfUri, setPdfUri] = useState<string>();
  useEffect(() => {
    (async (): Promise<void> => {
      if (!paper) return;
      setPdfUri('https://rycont.imfast.io/%EA%B5%90%EA%B3%BC%EC%84%9C/%EC%88%98%ED%95%99%28%EC%83%81%29%20-%20%EC%9D%B4%EC%A4%80%EC%97%B4.pdf');
    })();
  }, []);
  if (!paper) return <></>;
  return (
    <BottomSheetContentWrapper>
      <PaperTitle>{paper?.title}</PaperTitle>
      <Horizontal>
        <PDFLoader
          source={{ uri: pdfUri }}
        />
        <DownloadConfig style={{ flex: 1, flexWrap: 'wrap-reverse' }}>
          <View style={{ flex: 1 }} />
          <ConfigWrapper>
            <ConfigKey>글꼴</ConfigKey>
            <ConfigValue />
          </ConfigWrapper>
          <ConfigWrapper>
            <ConfigKey>글자 크기</ConfigKey>
            <ConfigValue keyboardType="number-pad" />
          </ConfigWrapper>
          <Horizontal>
            <View style={{ flex: 1 }} />
            <Button
              style={{
                marginRight: 6,
              }}
              onPress={(): void => {
                if (!pdfUri) return;
                RNFS.downloadFile({
                  toFile: `${RNFS.DocumentDirectoryPath}/temp.pdf`,
                  fromUrl: pdfUri,
                }).promise.then(() => FileViewer.open(`${RNFS.DocumentDirectoryPath}/temp.pdf`));
              }}
            >
              열기
            </Button>
            <Button onPress={(): void => {
              if (!pdfUri) return;
              RNFS.downloadFile({
                toFile: `${RNFS.DocumentDirectoryPath}/${paper.title}.pdf`,
                fromUrl: pdfUri,
              }).promise.then(() => ToastAndroid.show(`"${RNFS.DocumentDirectoryPath}/${paper.title}.pdf"에 저장되었습니다.`, ToastAndroid.LONG));
            }}
            >
              저장
            </Button>
          </Horizontal>
        </DownloadConfig>
      </Horizontal>
    </BottomSheetContentWrapper>
  );
};

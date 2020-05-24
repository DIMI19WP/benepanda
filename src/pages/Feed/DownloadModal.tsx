import React, { useState, useEffect } from 'react';
import { View, ToastAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import RNFetchBlob from 'rn-fetch-blob';
import Button from 'components/button';
import { getPrintablePaper, getRenderedPDFUri } from 'functions/benedu';
import { Paper } from 'types/paper';
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
      console.log(pdfUri);
      setPdfUri(`http://192.168.35.76:8080/${(await getRenderedPDFUri(paper.paperId)).substr(2)}`);
    })();
    return () => {
      setPdfUri(undefined);
    };
  }, [paper?.paperId]);
  if (!paper) return <></>;
  return (
    <BottomSheetContentWrapper>
      <PaperTitle>{paper?.title}</PaperTitle>
      <Horizontal>
        <PDFLoader
          source={{ uri: pdfUri }}
        />
        <DownloadConfig>
          <View style={{ flex: 1 }} />
          <ConfigWrapper>
            <ConfigKey>글꼴</ConfigKey>
            <ConfigValue />
          </ConfigWrapper>
          <ConfigWrapper>
            <ConfigKey>글자 크기</ConfigKey>
            <ConfigValue keyboardType="number-pad" />
          </ConfigWrapper>
          <Horizontal style={{ paddingRight: 6 }}>
            <View style={{ flex: 1 }} />
            <Button
              style={{
                marginRight: 6,
              }}
              onPress={(): void => {
                if (!pdfUri) return;
                const downloadPath = `${RNFS.DocumentDirectoryPath}/${paper.title}.pdf`;
                RNFS.downloadFile({
                  toFile: downloadPath,
                  fromUrl: pdfUri,
                }).promise.then(() => FileViewer.open(downloadPath));
              }}
            >
              열기
            </Button>
            <Button onPress={(): void => {
              if (!printableData) return;
              RNFS.downloadFile({
                toFile: `${RNFS.DocumentDirectoryPath}/${paper.title}.pdf`,
                fromUrl: printableData,
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

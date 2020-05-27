import React, { useState, useEffect } from 'react';
import { View, ToastAndroid, ActivityIndicator } from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import Button from 'components/button';
import { getRenderedPDFUri } from 'functions/benedu';
import { renderedPDF } from 'types/paper';
import { FILE_LOAD_URI } from 'types/constants';
import {
  BottomSheetContentWrapper, PaperTitle,
  ThumbnailViewer, Horizontal, DownloadConfig, ConfigWrapper, ConfigValue,
} from './styleds';

export default ({ paper }: {paper?: {
    title: string;
    paperId: string;
};}): JSX.Element => {
  const [loadableUris, setLoadableUris] = useState<renderedPDF>();
  const [isWaitingForOpen, setWaitingForOpen] = useState(false);
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        if (paper) setLoadableUris(await getRenderedPDFUri(paper.paperId));
      } catch (e) {
        alert('이런!', e.mesage);
      }
    })();
    return (): void => {
      setLoadableUris(undefined);
    };
  }, [paper?.paperId]);
  if (!paper) return <></>;
  return (
    <BottomSheetContentWrapper>
      <PaperTitle>{paper?.title}</PaperTitle>
      {!loadableUris ? <ActivityIndicator /> : (
        <Horizontal>
          <ThumbnailViewer source={{
            uri: FILE_LOAD_URI.replace('%s', loadableUris.thumbnail),
          }}
          />

          <DownloadConfig>
            <View style={{ flex: 1 }} />
            {/* <ConfigWrapper>
              <ConfigValue placeholder="설정" />
            </ConfigWrapper> */}
            {/* <ConfigWrapper>
            <ConfigKey>글자 크기</ConfigKey>
            <ConfigValue keyboardType="number-pad" />
          </ConfigWrapper> */}
            <Horizontal style={{ paddingRight: 6 }}>
              <View style={{ flex: 1 }} />
              {isWaitingForOpen ? <ActivityIndicator /> : (
                <Button
                  style={{
                    marginRight: 6,
                  }}
                  onPress={async (): Promise<void> => {
                    setWaitingForOpen(true);
                    if (!loadableUris) return;
                    const downloadPath = `${RNFS.DocumentDirectoryPath}/${paper.title}.pdf`;
                    RNFS.downloadFile({
                      toFile: downloadPath,
                      fromUrl: FILE_LOAD_URI.replace('%s', loadableUris.pdf),
                    }).promise.then(() => {
                      FileViewer.open(downloadPath);
                      setWaitingForOpen(false);
                    });
                  }}
                >
                  열기
                </Button>
              )}
              <Button onPress={(): void => {
                if (!loadableUris) return;
                RNFS.downloadFile({
                  toFile: `${RNFS.DocumentDirectoryPath}/${paper.title}.pdf`,
                  fromUrl: FILE_LOAD_URI.replace('%s', loadableUris.pdf),
                }).promise.then(() => ToastAndroid.show(`"${RNFS.DocumentDirectoryPath}/${paper.title}.pdf"에 저장되었습니다.`, ToastAndroid.LONG));
              }}
              >
                저장
              </Button>
            </Horizontal>
          </DownloadConfig>
        </Horizontal>
      )}
    </BottomSheetContentWrapper>
  );
};

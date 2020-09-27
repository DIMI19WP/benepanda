import React, { useState, useEffect } from "react";
import {
  ActivityIndicator, Alert,
} from "react-native";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

import { getRenderedPDFUri } from "functions/benedu";
import { renderedPDF } from "types/paper";
import { FILE_LOAD_URI } from "types/constants";
import { BlockButton } from "components/atomics";
import {
  BottomSheetContentWrapper, PaperTitle,
  ThumbnailViewer, Horizontal, DownloadConfig, ConfigWrapper, ConfigKey, ConfigValue,
} from "./styleds";
import Answer from "./Answers";

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
        Alert.alert("이런!", e.mesage);
      }
    })();
    return (): void => {
      setLoadableUris(undefined);
    };
  }, [paper?.paperId]);
  if (!paper) return <></>;
  const openFile = async (): Promise<void> => {
    setWaitingForOpen(true);
    if (!loadableUris) return;
    const downloadPath = `${RNFS.DocumentDirectoryPath}/${paper.title}.pdf`;
    RNFS.downloadFile({
      toFile: downloadPath,
      fromUrl: FILE_LOAD_URI.replace("%s", loadableUris.pdf),
    }).promise.then(() => {
      FileViewer.open(downloadPath);
      setWaitingForOpen(false);
    });
  };
  return (
    <BottomSheetContentWrapper>
      <PaperTitle>{paper?.title}</PaperTitle>
      {!loadableUris ? <ActivityIndicator color="#CDDBC4" /> : (
        <Horizontal>
          <ThumbnailViewer source={{
            uri: FILE_LOAD_URI.replace("%s", loadableUris.thumbnail),
          }}
          />
          <Answer />
          <DownloadConfig>
            <ConfigWrapper>
              <ConfigKey>1</ConfigKey>
              <ConfigValue keyboardType="number-pad" />
            </ConfigWrapper>
            <Horizontal style={{ paddingRight: 6, justifyContent: "flex-end" }}>
              {isWaitingForOpen ? <ActivityIndicator color="#CDDBC4" /> : (
                <BlockButton
                  onPress={openFile}
                >
                  열기
                </BlockButton>
              )}
              <BlockButton style={{ marginLeft: 6 }}>
                정답 제출
              </BlockButton>
            </Horizontal>
          </DownloadConfig>
        </Horizontal>
      )}
    </BottomSheetContentWrapper>
  );
};

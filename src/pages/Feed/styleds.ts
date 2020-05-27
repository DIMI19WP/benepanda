import styled from '@emotion/native';
import Pdf from 'react-native-pdf';

export const PaperWrapper = styled.View`
  background-color: white;
  padding: 6px 24px 24px 24px;
  border-radius: 12px;
  elevation: 670;
  margin-bottom: 12px;
  flex-direction: row;
`;

export const PaperTitle = styled.Text`
  font-size: 18px;
  font-family: 'NotoSansCJKkr-Black';
`;

export const InfoWrapper = styled.View`
  font-size: 16px;
  flex-direction: row;
`;

export const InfoKey = styled.Text`
  color: #AAAAAA;
  margin-right: 6px;
`;

export const PaperMainInfo = styled.View`
  flex: 1;
`;

export const PandaWrapper = styled.View`
  width: 200px;
  height: 400px;
  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Panda = styled.Image`
    width: 200px;
    height: 200px;
`;

export const NoPaper = styled.Text`
  font-family: 'NotoSansCJKkr-Black';
  opacity: 0.7;
  text-align: center;
`;

export const EmptyWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const QuestionQuantityBadge = styled.Text`
  font-family: 'NotoSansCJKkr-Black';
  margin-top: 18px;
  background-color: #F4F9EE;
  color: #62A436;
  height: 60px;
  width: 60px;
  padding: 5px;
  text-align: center;
  border-radius: 60px;
  text-align-vertical: center;
`;

export const LeftDate = styled.Text`
  margin-bottom: 12px;
  opacity: 0.4;
  margin-top: 18px;
`;

export const PaperList = styled.FlatList`
  flex-wrap: wrap;
`;

export const PaperGrid = styled.View`
`;

export const PaperListWrapper = styled.View`
`;
export const BottomSheetContentWrapper = styled.View`
  width: 100%;
  background-color: white;
  bottom: 0;
  position: absolute;
  border-radius: 24px;
  padding: 24px;
`;
export const BottomSheetWrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
`;
export const PDFLoader = styled(Pdf)`
    width: 300px;
    height: 400px;
    margin-bottom: 6px;
`;
export const Horizontal = styled.View`
    flex-direction: row;
`;

export const DownloadConfig = styled.View`
  flex: 1;
  padding: 12px;
`;

export const ConfigWrapper = styled(Horizontal)`
    padding: 6px;
`;
export const ConfigKey = styled.Text`
    font-family: 'NotoSansCJKkr-Black';
    text-align-vertical: center;
    font-size: 12px;
    flex: 0.3;
    margin-right: 6px;
`;
export const ConfigValue = styled.TextInput`
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    padding: 6px;
    flex: 1;
`;

export const ThumbnailViewer = styled.Image`
  width: 300px;
  height: 400px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 12px;
`;

import React, { useState, useEffect, useRef } from 'react';
import {
  Text, TouchableNativeFeedback, SectionList, Dimensions, BackHandler,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Orientation from 'react-native-orientation';
import moment from 'moment';
import 'moment/locale/ko';

import PageWithTitle from 'templetes/PageWithTitle';
import { Workpaper } from 'types/workpaper';
import getWorkpapers from 'functions/benedu/getWorkpapers';
import Panda from 'assets/panda.svg';
import {
  EmptyWrapper, InfoKey, PaperWrapper, PaperTitle, InfoWrapper,
  LeftDate, NoWorkpaper, PandaWrapper, PaperMainInfo, QuestionQuantityBadge,
  BottomSheetContentWrapper, BottomSheetWrapper,
} from './styleds';
import DownloadModal from './DownloadModal';

export default (): JSX.Element => {
  const [workpapers, setWorkpapers] = useState<Workpaper[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedPaper, selectPaper] = useState<{
    title: string;
    paperId: string;
  }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bottomSheetRef = useRef<any>();
  const sortedWorkpapers = workpapers?.reduce((acc: {
    [key: string]: Workpaper[];
  }, paper) => {
    const key = paper.endedAt.fromNow();
    if (acc[key]) acc[key] = [...acc[key], paper];
    else acc[key] = [paper];
    return acc;
  }, {});
  useEffect(() => {
    moment.locale('ko');
    (async (): Promise<void> => {
      setWorkpapers(await getWorkpapers());
    })();
    function orientListener(): void {
      setScreenHeight(Dimensions.get('window').height);
    }
    Orientation.addOrientationListener(orientListener);
    return (): void => Orientation.removeOrientationListener(orientListener);
  }, []);
  useEffect(() => {
    function closeModal(): boolean {
      if (isModalOpened) {
        bottomSheetRef.current.snapTo(1);
        bottomSheetRef.current.snapTo(1);
        return true;
      }
      return false;
    }
    BackHandler.addEventListener('hardwareBackPress', closeModal);
    return (): void => BackHandler.removeEventListener('hardwareBackPress', closeModal);
  }, [isModalOpened]);
  useEffect(() => {
    getWorkpapers().then((updatedWorkpapers) => {
      setWorkpapers(updatedWorkpapers);
      setRefreshing(false);
    });
  }, [refreshing]);
  if (workpapers === null) return (<></>);
  return (
    <>
      <PageWithTitle titleText={`밀린 과제 ${workpapers.length}개`}>
        {workpapers.length !== 0 ? (
          sortedWorkpapers && (
          <SectionList
            sections={Object.keys(sortedWorkpapers).map((key) => ({
              title: key,
              data: sortedWorkpapers[key],
            }))}
            keyExtractor={(paper): string => paper.paperTitle}
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            renderSectionHeader={({ section: { title } }) => <LeftDate>{title}</LeftDate>}
            refreshing={refreshing}
            onRefresh={(): void => setRefreshing(true)}
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            renderItem={({ item: paper }) => (
              <TouchableNativeFeedback
                key={paper.paperTitle}
                onPress={(): void => {
                  selectPaper({
                    paperId: paper.paperId,
                    title: paper.paperTitle,
                  });
                  bottomSheetRef.current.snapTo(0);
                  bottomSheetRef.current.snapTo(0);
                }}
              >
                <PaperWrapper>
                  <PaperMainInfo>
                    <PaperTitle>{paper.paperTitle}</PaperTitle>
                    <InfoWrapper>
                      <InfoKey>과목</InfoKey>
                      <Text>{paper.subject}</Text>
                    </InfoWrapper>
                    <InfoWrapper>
                      <InfoKey>출제자</InfoKey>
                      <Text>{paper.register}</Text>
                    </InfoWrapper>
                    <InfoWrapper>
                      <InfoKey>시작일</InfoKey>
                      <Text>{(paper.startedAt?.format('M월 D일'))}</Text>
                    </InfoWrapper>
                  </PaperMainInfo>
                  <QuestionQuantityBadge>
                    {paper.questionQuantity}
                    문제
                  </QuestionQuantityBadge>
                </PaperWrapper>
              </TouchableNativeFeedback>
            )}
          />
          )
        ) : (
          <EmptyWrapper>
            <PandaWrapper>
              <Panda />
            </PandaWrapper>
            <NoWorkpaper>과제가 없어요!</NoWorkpaper>
          </EmptyWrapper>
        )}
      </PageWithTitle>
      <BottomSheet
        snapPoints={[screenHeight, 0]}
        initialSnap={1}
        ref={bottomSheetRef}
        onOpenStart={() => setIsModalOpened(() => true)}
        onCloseEnd={() => setIsModalOpened(() => false)}
        renderContent={() => (
          <BottomSheetWrapper>
            <DownloadModal paper={selectedPaper} />
          </BottomSheetWrapper>
        )}
      />
    </>
  );
};

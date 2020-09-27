import React, { useState, useEffect, useRef } from "react";
import {
  Text, TouchableNativeFeedback, SectionList, BackHandler,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import moment from "moment";
import useDimensions from "@rnhooks/dimensions";
import "moment/locale/ko";

import PageWithTitle, { Background, Title } from "templetes/PageWithTitle";
import { BriefPaper } from "types/paper";
import getPapers from "functions/benedu/getTaskExamList";
import getGeneratedExam from "functions/benedu/getGeneratedExam";
import _ from "lodash";
import {
  EmptyWrapper, InfoKey, PaperWrapper, PaperTitle, InfoWrapper,
  LeftDate, NoPaper, PaperMainInfo, QuestionQuantityBadge,
  BottomSheetWrapper, Panda,
} from "./styleds";
import DownloadModal from "./DownloadModal";

export default (): JSX.Element => {
  const [taskExams, setTaskExams] = useState<BriefPaper[] >();
  const [generatedExams, setGeneratedExams] = useState<BriefPaper[]>();
  const [refreshing, setRefreshing] = useState(false);
  const { width, height } = useDimensions("window");
  const maxHeight = Math.max(width, height);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedPaper, selectPaper] = useState<{
    title: string;
    paperId: string;
  }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bottomSheetRef = useRef<any>();
  const [groupedExams, setGroupedExams] = useState<{
    sectionName: string;
    data: BriefPaper[];
  }[]>();

  useEffect(() => {
    if (!taskExams) return;
    if (!generatedExams) return;
    setGroupedExams(
      Object.entries(_.groupBy(([...taskExams, ...generatedExams].map((e) => ({ ...e, sectionName: e.endedAt?.fromNow() || "문제은행" }))), "sectionName")).map((e) => ({
        sectionName: e[0],
        data: e[1],
      })),
    );
  }, [taskExams, generatedExams]);

  useEffect(() => {
    moment.locale("ko");
    (async (): Promise<void> => {
      setGeneratedExams(await getGeneratedExam());
      setTaskExams(await getPapers());
    })();
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
    BackHandler.addEventListener("hardwareBackPress", closeModal);
    return (): void => BackHandler.removeEventListener("hardwareBackPress", closeModal);
  }, [isModalOpened]);
  useEffect(() => {
    getPapers().then((updatedPapers) => {
      setTaskExams(updatedPapers);
      setRefreshing(false);
    });
  }, [refreshing]);
  if (!groupedExams) return (<PageWithTitle titleText="남은 과제"><></></PageWithTitle>);
  return (
    <>

      <Background>
        {groupedExams.length !== 0 ? (
          groupedExams && (
          <SectionList
            sections={groupedExams}
            keyExtractor={(paper): string => paper.paperId}
            renderSectionHeader={
              ({ section: { sectionName } }): JSX.Element => <LeftDate>{sectionName}</LeftDate>
            }
            scrollEnabled
            ListHeaderComponent={(): JSX.Element => <Title>{`남은 과제 ${Number(taskExams?.length) + Number(generatedExams?.length)}개`}</Title>}
            refreshing={refreshing}
            onRefresh={(): void => setRefreshing(true)}
            renderItem={({ item: paper }): JSX.Element => (
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
                    {paper.register
                    && (
                    <InfoWrapper>
                      <InfoKey>출제자</InfoKey>
                      <Text>{paper.register}</Text>
                    </InfoWrapper>
                    )}
                    <InfoWrapper>
                      <InfoKey>생성일</InfoKey>
                      <Text>{(paper.startedAt?.format("M월 D일"))}</Text>
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
            <Panda resizeMode="center" source={require("assets/panda.png")} />
            <NoPaper>과제가 없어요!</NoPaper>
          </EmptyWrapper>
        )}
      </Background>
      {/* </PageWithTitle> */}
      <BottomSheet
        snapPoints={[maxHeight, 0]}
        initialSnap={1}
        enabledManualSnapping
        ref={bottomSheetRef}
        enabledContentGestureInteraction
        onOpenStart={(): void => setIsModalOpened(() => true)}
        onCloseEnd={(): void => setIsModalOpened(() => false)}
        renderContent={(): JSX.Element => (
          <BottomSheetWrapper>
            {selectedPaper && <DownloadModal paper={selectedPaper} />}
          </BottomSheetWrapper>
        )}
      />
    </>
  );
};

import React, { useState, useEffect, Fragment } from 'react';
import {
  Text, TouchableNativeFeedback,
} from 'react-native';
import { addOrientationListener } from 'react-native-orientation';

import PageWithTitle from 'templetes/PageWithTitle';
import { Workpaper } from 'types/workpaper';
import getWorkpapers from 'functions/benedu/getWorkpapers';
import Panda from 'assets/panda.svg';
import moment from 'moment';
import 'moment/locale/ko';

import { FlatList } from 'react-native-gesture-handler';
import {
  EmptyWrapper, InfoKey, PaperWrapper, ExamTitle, InfoWrapper,
  LeftDate, NoWorkpaper, PandaWrapper, PaperMainInfo, QuestionQuantityBadge,
} from './styleds';

export default (): JSX.Element => {
  const [workpapers, setWorkpapers] = useState<Workpaper[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
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

    addOrientationListener((orientation) => console.log(orientation));
  }, []);
  useEffect(() => {
    getWorkpapers().then((updatedWorkpapers) => {
      setWorkpapers(updatedWorkpapers);
      setRefreshing(false);
    });
  }, [refreshing]);
  if (workpapers === null) return (<></>);
  return (
    <PageWithTitle titleText={`밀린 과제 ${workpapers.length}개`}>
      {workpapers.length !== 0 ? (
        sortedWorkpapers && (
          Object.keys(sortedWorkpapers).map((key) => ({
            title: key,
            data: sortedWorkpapers[key],
          })).map(({ title, data: papers }) => (
            <Fragment key={title}>
              <LeftDate>{title}</LeftDate>
              <FlatList
                data={papers}
                style={{ width: 300 }}
                keyExtractor={({ examTitle }) => examTitle}
                renderItem={({ item: paper }) => (
                  <TouchableNativeFeedback
                    key={paper.examTitle}
                  >
                    <PaperWrapper>
                      <PaperMainInfo>
                        <ExamTitle>{paper.examTitle}</ExamTitle>
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
            </Fragment>
          ))
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
  );
};

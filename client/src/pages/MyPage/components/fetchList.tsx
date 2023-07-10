import React from 'react';

export const fetchList = async (
  nowActivatedTabValue: string,
  setListData: React.Dispatch<React.SetStateAction<any>>,
  history: any,
  pageSize: number,
  criterionState: any,
  currentCriterionValue: string,
  pageNum: number,
) => {
  try {
    // 현재 활성화된 탭에 따라 API 요청 URL을 생성해준다.
    let select = '';
    switch (nowActivatedTabValue) {
      case 'firstBtn':
        select = '';
        break;
      case 'secondBtn':
        select = '/com';
        break;
      case 'thirdBtn':
        select = '/yourPath'; // 페이지 경로로 변경하기
        break;
    }

    // API를 요청한다.
    const response = await fetch(`https://API 주소`);

    // 응답을 JSON 형태로 변환한다.
    const data = await response.json();

    // 응답에 오류가 있다면, 알림을 표시하고 함수종료
    if (data.responseCode !== undefined) {
      alert(data.responseMessage);
      return;
    }

    // 가져온 데이터를 state에 저장한다.
    setListData(data.counselingList);

    // 쿼리파라미터
    history.push({
      search: `?page=${pageNum}&pageSize=${pageSize * pageNum}&_criterion=${
        criterionState[currentCriterionValue]
      }`,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

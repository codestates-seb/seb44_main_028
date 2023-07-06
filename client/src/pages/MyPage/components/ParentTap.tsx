import React, { useState } from 'react';

function ParentTap() {
  //탭모드를 저장한 state/ 초기값은 firstBtn으로 설정
  const [nowActivatedTabValue, setNowActivatedTabValue] = useState('firstBtn');

  //탭모드 변경시 실행되는 함수
  const handleNowActivatedTabValue = (inputValue: string) => {
    setNowActivatedTabValue(inputValue);
    // 탭 버튼이 클릭되면 fetchApplicationList 함수를 호출하며, 현재 페이지 번호가 전달된다.
    // fetchList 함수가 어디서 정의되었는지 알 수 없으므로 임시로 작성

    const fetchList = (currentPageNumber: number) => {
      // 실제 fetch 로직을 구현해야 함
      console.log(`Fetching list for page number ${currentPageNumber}`);
      // 	try {
      //     const response = await fetch(`your-api-url?page=${currentPageNumber}`);
      //     if (!response.ok) {
      //       throw new Error('Error fetching data');
      //     }

      //     const data = await response.json();
      //     console.log('Fetched data:', data);
      //   } catch (error) {
      //     console.error('Fetch error:', error);
      //   }
      // };
    };

    const currentPageNumber = 1; // 현재 페이지 번호를 임시로 설정
    fetchList(currentPageNumber);

    return <div>ParentTab</div>;
  };
}

export default ParentTap;

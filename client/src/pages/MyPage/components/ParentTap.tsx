import React, { useState } from 'react';
import TapButton from './TapButton';
import { TAP } from '../constants';
import { ParentWrapper } from '../style';
import ItemCard from '../../../common/components/ItemCard';
function ParentTap() {
  const [tapList, setTapList] = useState<string[]>([]);

  return (
    <>
      <ParentWrapper>
        {TAP.map((tap, index) => (
          <TapButton key={index} tap={tap} setTapList={setTapList} />
        ))}
      </ParentWrapper>
      <div>
        {tapList[0] === '빌려준내역' && <div>빌려준 내역</div>}
        {tapList[0] === '빌린내역' && <div>빌린 내역</div>}
        {tapList[0] === '관심 목록' && <ItemCard />}
      </div>
    </>
  );
}

export default ParentTap;

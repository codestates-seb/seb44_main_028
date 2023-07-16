import { useState } from 'react';
import TapButton from './TapButton';
import { TAP } from '../constants';
import { ParentWrapper, TapWrapper } from '../style';
import LendList from './LendList';
import BorrowList from './BorrowList';
import WishList from './WishList';
import { borrowCardProps } from '../../../common/type';

function ParentTap() {
  const [tapList, setTapList] = useState<string[]>([]);
  // const [reservations, setReservations] = useState<Reservation[]>([]);

  return (
    <>
      <ParentWrapper>
        <TapWrapper>
          {TAP.map((tap, index) => (
            <TapButton key={index} tap={tap} setTapList={setTapList} />
          ))}
        </TapWrapper>
      </ParentWrapper>

      <div>
        {/* {/* {tapList[0] === '빌려준내역' && <div>빌려준 내역</div>} /} */}
        {tapList[0] === '빌려준내역' && <LendList />}
        {/* {tapList[0] === '빌린내역' && <div>빌린 내역</div>} */}
        {tapList[0] === '빌린내역' && <BorrowList />}
        {tapList[0] === '관심 목록' && <WishList />}
      </div>
    </>
  );
}

export default ParentTap;

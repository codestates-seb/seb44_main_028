import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import { WishListWrapper, LendListWrapper, LendWrapper } from '../style';
import LENDCARD_DATA from '../../../common/components/MypageCard/BorrowCard';
import { DefaultBtn } from '../../../common/components/Button';
import { colorPalette } from '../../../common/utils/enum/colorPalette';

function LendList() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [itemsPerPage] = useState(3);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

  useEffect(() => {
    fetchItemsForPage(currentPage);
    // 페이지 번호를 인수로 받아 해당 페이지에 해당하는 데이터를 가져오는 방식
  }, [currentPage]);
  const fetchItemsForPage = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/reservations/products/`,
        {
          params: {
            reservationId: 1,
            size: itemsPerPage,
            page: currentPage,
            status: 'INUSE',
          },
        },
      ); // 실제 API 엔드포인트에 맞게 수정
      console.log(Array.isArray(response));
      setItems(response.data.responses);
      setTotalItemsCount(response.data.listSize);
      console.log(response.data.responses);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };
  console.log('items:', items);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <WishListWrapper>
      빌려준내역
      <LendWrapper>
        <DefaultBtn
          color={colorPalette.deepMintColor}
          backgroundColor={colorPalette.whiteColor}
        >
          예약요청
        </DefaultBtn>
        <DefaultBtn
          color={colorPalette.deepMintColor}
          backgroundColor={colorPalette.whiteColor}
        >
          예약확정
        </DefaultBtn>
        <DefaultBtn
          color={colorPalette.deepMintColor}
          backgroundColor={colorPalette.whiteColor}
        >
          거절한 예약
        </DefaultBtn>
        <DefaultBtn
          color={colorPalette.deepMintColor}
          backgroundColor={colorPalette.whiteColor}
        >
          지난예약
        </DefaultBtn>
      </LendWrapper>
      <LendListWrapper>
        <div>
          {items.map((item, index) => (
            <LENDCARD_DATA key={index} borrowCardData={item} />
          ))}
        </div>
      </LendListWrapper>
      <div>
        <Paging
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItemsCount={totalItemsCount}
          totalPages={totalPages}
        />
      </div>
    </WishListWrapper>
  );
}

export default LendList;

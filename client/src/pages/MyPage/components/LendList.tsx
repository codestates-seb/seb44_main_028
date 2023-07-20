import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import { WishListWrapper, LendListWrapper, LendWrapper } from '../style';
import { DefaultBtn } from '../../../common/components/Button';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import LendCard from '../../../common/components/MypageCard/LendCard';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { ACCESS_TOKEN } from '../../Login/constants';
import { LENDCARD_DATA } from '../constants';

interface lendCardProps {
  reservationId: string;
  status: string;
  username: string;
  totalFee: string;
  startDate: string;
  endDate: string;
  image: string;
}

function LendList() {
  const decrypt = useDecryptToken();

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [currentStatus, setCurrentStatus] = useState('REQUESTED'); //현재상태
  const [itemsPerPage] = useState(3);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);
  console.log('currentStatus:', currentStatus);

  useEffect(() => {
    fetchItemsForPage(currentPage);
    // 페이지 번호를 인수로 받아 해당 페이지에 해당하는 데이터를 가져오는 방식
  }, [currentPage]);
  const fetchItemsForPage = async (page: number) => {
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN) || '';
    const accessToken = decrypt(encryptedAccessToken);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/reservations/products/`,
        {
          params: {
            reservationId: 1,
            size: itemsPerPage,
            page: currentPage,
            status: currentStatus,
          },
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJtZW1iZXJJZCI6Miwic3ViIjoiZGFkYSIsImlhdCI6MTY4OTY2MTE3NiwiZXhwIjoxNjkwMjYxMTc2fQ.8dlZMbgWcusz7ykGQ9XeqIQY3Kk2usnPdLHOZFKgk0t72mDC7jRA2TOSgXF8IYtDtnJwFX5aUWjqP5gsW2jxFQ`,
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
        {items.map((item, index) => (
          <LendCard key={index} lendCardData={item} />
        ))}
        {/* {LENDCARD_DATA.map((item, index) => (
          <LendCard key={index} lendCardData={item} />
        ))} */}
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

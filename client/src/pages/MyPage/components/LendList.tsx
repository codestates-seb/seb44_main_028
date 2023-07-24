import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import {
  WishListWrapper,
  LendListWrapper,
  LendWrapper,
  LendListContainer,
} from '../style';
import { DefaultBtn } from '../../../common/components/Button';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import LendCard from '../../../common/components/MypageCard/LendCard';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { ACCESS_TOKEN } from '../../Login/constants';
import { lendCardProps } from '../../../common/type';

interface LendListProps {
  currentStatus: string;
  lendCardData: lendCardProps[];
}

function LendList({ lendCardData }: { lendCardData: lendCardProps }) {
  const decrypt = useDecryptToken();

  const [items, setItems] = useState<lendCardProps[]>([]);
  const [isItemCardClicked, setIsItemCardClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지

  const [currentStatus, setCurrentStatus] = useState('REQUESTED'); //현재상태
  const [itemsPerPage] = useState(100);

  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

  const [selectedLendCard, setSelectedLendCard] =
    useState<lendCardProps | null>(null);

  console.log('currentStatus:', currentStatus);

  const fetchItemsForPage = async (page: number) => {
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN) || '';
    const accessToken = decrypt(encryptedAccessToken);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/members`,
        {
          params: { page: 0, size: 100 },
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      ); // 실제 API 엔드포인트에 맞게 수정
      console.log(Array.isArray(response));
      setItems(response.data.products);
      setTotalItemsCount(response.data.pageInfo.totalElements);
      console.log('product"', response);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };
  console.log('items:', items);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchItemsForPage(currentPage);
    // 페이지 번호를 인수로 받아 해당 페이지에 해당하는 데이터를 가져오는 방식
  }, [currentPage]);

  const handleReservationRequest = () => {
    //예약 요청을 누르면 실행되는 함수
    setCurrentStatus('REQUESTED');
    setCurrentPage(0);
    // setIsItemCardClicked(false);
    console.log('예약요청:', items);
  };
  const handleReservedItems = () => {
    setCurrentStatus('RESERVED');
    setCurrentPage(0);
    // setIsItemCardClicked(false);
    console.log('예약확정:', items);
  };

  const handleCompletedItems = () => {
    setCurrentStatus('COMPLETED');
    setCurrentPage(0);
    // setIsItemCardClicked(false);
    console.log('지난예약:', items);
    // handlePageChange(currentPage);
    // setIsOpen(true);
  };
  const handleCanceledItems = () => {
    setCurrentStatus('CANCELED');
    setCurrentPage(0);
    // setIsItemCardClicked(false);
    console.log('거절한 예약:', items);
    // handlePageChange(currentPage);
    // setIsOpen(true);
  };
  console.log('sekect', selectedLendCard);
  return (
    <WishListWrapper>
      {isItemCardClicked === true ? (
        <LendWrapper>
          <DefaultBtn
            color={colorPalette.deepMintColor}
            backgroundColor={colorPalette.whiteColor}
            onClick={handleReservationRequest}
          >
            예약요청
          </DefaultBtn>
          <DefaultBtn
            color={colorPalette.deepMintColor}
            backgroundColor={colorPalette.whiteColor}
            onClick={handleReservedItems}
          >
            예약확정
          </DefaultBtn>
          <DefaultBtn
            color={colorPalette.deepMintColor}
            backgroundColor={colorPalette.whiteColor}
            onClick={handleCanceledItems}
          >
            거절한 예약
          </DefaultBtn>
          <DefaultBtn
            color={colorPalette.deepMintColor}
            backgroundColor={colorPalette.whiteColor}
            onClick={handleCompletedItems}
          >
            지난예약
          </DefaultBtn>
        </LendWrapper>
      ) : null}
      <LendListWrapper>
        {isItemCardClicked && selectedLendCard ? (
          <LendCard
            lendCardData={selectedLendCard}
            setIsItemCardClicked={setIsItemCardClicked}
            setSelectedLendCard={setSelectedLendCard}
            currentStatus={currentStatus}
          />
        ) : (
          items?.map((item, index) => (
            <LendCard
              key={index}
              lendCardData={item}
              isItemCardClicked={isItemCardClicked}
              setIsItemCardClicked={setIsItemCardClicked}
              setSelectedLendCard={setSelectedLendCard}
              currentStatus={currentStatus}
              setCurrentStatus={setCurrentStatus}
            />
          ))
        )}
        {/* {LENDCARD_DATA.map((item, index) => (
          <LendCard key={index} lendCardData={item} />
        ))} */}
      </LendListWrapper>
      {/* <div>
        <Paging
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItemsCount={totalItemsCount}
          totalPages={totalPages}
        />
      </div> */}
    </WishListWrapper>
  );
}

export default LendList;

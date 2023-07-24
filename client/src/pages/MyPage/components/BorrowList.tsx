import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import Modal from './Modal';
import { BorrowWrapper, BorrowCardWrappre } from '../style';
import { DefaultBtn } from '../../../common/components/Button';
import { colorPalette } from '../../../common/utils/enum/colorPalette';

import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { ACCESS_TOKEN } from '../../Login/constants';
import BorrowCard from '../../../common/components/MypageCard/BorrowCard';
interface borrowCardProps {
  reservationId: string;
  title: string;
  image: string;
  status: string;
  startDate: string;
  endDate: string;
}
function BorrowList() {
  const decrypt = useDecryptToken();

  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<borrowCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(9);
  const [totalItemsCount, setTotalItemsCount] = useState(currentPage);
  const [currentStatus, setCurrentStatus] = useState('REQUESTED');
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);
  console.log('currentStatus:', currentStatus);
  console.log('totalPages:', totalPages);

  useEffect(() => {
    fetchItemsForPage(currentPage, currentStatus);
    // 페이지 번호를 인수로 받아 해당 페이지에 해당하는 데이터를 가져오는 방식
  }, [currentPage, currentStatus, items]);

  const fetchItemsForPage = async (page: number, status: string) => {
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN) || '';
    const accessToken = decrypt(encryptedAccessToken);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/reservations`,
        {
          params: {
            size: itemsPerPage,
            page: currentPage,
            status: currentStatus,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ); // 실제 API 엔드포인트에 맞게 수정
      setItems(response.data.reservations);
      console.log('api 데이터들', items);
      setTotalItemsCount(response.data.pageInfo.totalElements);
      console.log('product"', response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };
  useEffect(() => {
    console.log('렌더링 될 items:', items);
  }, [items]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleReservationRequest = () => {
    //예약 요청을 누르면 실행되는 함수
    setCurrentStatus('REQUESTED');
    setCurrentPage(currentPage);
    setIsOpen(true);
    console.log('예약요청:', items);
  };
  const handleReservedItems = () => {
    setCurrentStatus('RESERVED');
    setCurrentPage(currentPage);
    setIsOpen(true);
    console.log('예약확정:', items);
  };
  const handleInUseItems = () => {
    setCurrentStatus('INUSE');
    setCurrentPage(currentPage);
    setIsOpen(true);
    console.log('사용중인 플레이팩:', items);
  };

  const handleCompletedItems = () => {
    setCurrentStatus('COMPLETED');
    setCurrentPage(currentPage);
    setIsOpen(true);
    console.log('사용 완료한 플레이팩:', items);
    // handlePageChange(currentPage);
    // setIsOpen(true);
  };
  const handleCanceledItems = () => {
    setCurrentStatus('CANCELED');
    setCurrentPage(currentPage);
    setIsOpen(true);
    console.log('예약 취소한 내역:', items);
    // handlePageChange(currentPage);
    // setIsOpen(true);
  };

  return (
    <div>
      <BorrowWrapper>
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
          onClick={handleInUseItems}
        >
          사용중인 플레이팩
        </DefaultBtn>
        <DefaultBtn
          color={colorPalette.deepMintColor}
          backgroundColor={colorPalette.whiteColor}
          onClick={handleCompletedItems}
        >
          사용 완료한 플레이팩
        </DefaultBtn>
        <DefaultBtn
          color={colorPalette.deepMintColor}
          backgroundColor={colorPalette.whiteColor}
          onClick={handleCanceledItems}
        >
          예약취소내역
        </DefaultBtn>
      </BorrowWrapper>
      <BorrowCardWrappre>
        {/* {items &&
          items.map((item, index) => (
            <BorrowCard key={index} borrowCardData={item} />
          ))} */}
        {items.map((item, index) => (
          <BorrowCard key={index} borrowCardData={item} />
        ))}
      </BorrowCardWrappre>
      {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        솔직한 별점을 입력해주세요.
      </Modal> */}
      <Paging
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItemsCount={totalItemsCount}
        totalPages={totalPages}
      />
    </div>
  );
}
export default BorrowList;

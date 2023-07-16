import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import Modal from './Modal';
import BorrowCard from '../../.././common/components/MypageCard/BorrowCard';
import { borrowCardProps } from '../../../common/type';
import { BORROWCARD_DATA } from '../constants';
import { BorrowWrapper, BorrowCardWrappre } from '../style';
import { DefaultBtn } from '../../../common/components/Button';
import { colorPalette } from '../../../common/utils/enum/colorPalette';

function BorrowList() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<borrowCardProps[]>([]);
  // const [items, setItems] = useState<borrowCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  // const [totalItemsCount, setTotalItemsCount] = useState(BORROWCARD_DATA.length);
  const [currentStatus, setCurrentStatus] = useState('REQUESTED');
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);
  console.log('currentStatus:', currentStatus);

  useEffect(() => {
    fetchItemsForPage(currentPage, currentStatus);
    // 페이지 번호를 인수로 받아 해당 페이지에 해당하는 데이터를 가져오는 방식
  }, [currentPage, currentStatus]);

  const fetchItemsForPage = async (page: number, status: string) => {
    // const startIndex = (page - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const filteredItems = BORROWCARD_DATA.filter(
    //   (item) => item.status === status,
    // );
    // const slicedItems = filteredItems.slice(startIndex, endIndex);
    // setItems(slicedItems);
    // setTotalItemsCount(filteredItems.length);
    // };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/reservations`,
        {
          params: {
            size: itemsPerPage,
            page: currentPage,
            status: currentStatus,
          },
        },
      ); // 실제 API 엔드포인트에 맞게 수정
      console.log(Array.isArray(response.data));
      setItems(response.data.reservations);
      setTotalItemsCount(response.data.pageInfo.totalPages);
      console.log('setItems:', response.data);
      console.log('currentPage:', currentPage);
      // console.log('currentStatus:', currentStatus);
      // console.log('totalElements:', response.data);
      // console.log('totalItemsCount:', totalItemsCount);
      // console.log('response:', response.data.responses);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };
  useEffect(() => {
    console.log('렌더링 될 items:', items);
  }, [items]);

  console.log('items:', items);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleReservationRequest = () => {
    //예약 요청을 누르면 실행되는 함수
    setCurrentStatus('REQUESTED');
    setCurrentPage(1);
    setIsOpen(true);
    console.log('예약요청:', items);
  };
  const handleReservedItems = () => {
    setCurrentStatus('RESERVED');
    setCurrentPage(1);
    setIsOpen(true);
    console.log('예약확정:', items);
  };
  const handleInUseItems = () => {
    setCurrentStatus('INUSE');
    setCurrentPage(1);
    setIsOpen(true);
    console.log('사용중인 플레이팩:', items);
  };

  const handleCompletedItems = () => {
    setCurrentStatus('COMPLETED');
    setCurrentPage(1);
    setIsOpen(true);
    console.log('사용 완료한 플레이팩:', items);
    // handlePageChange(currentPage);
    // setIsOpen(true);
  };
  const handleCanceledItems = () => {
    setCurrentStatus('CANCELED');
    setCurrentPage(1);
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
        {items.length > 0 ? (
          items.map((item, index) => (
            <BorrowCard key={index} borrowCardData={item} />
          ))
        ) : (
          <div>데이터를 불러오는 중입니다...</div>
        )}
      </BorrowCardWrappre>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        솔직한 별점을 입력해주세요.
      </Modal>
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

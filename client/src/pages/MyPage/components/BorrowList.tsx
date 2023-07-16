import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import Modal from './Modal';
import BorrowCard from '../../.././common/components/MypageCard/BorrowCard';
import { borrowCardProps } from '../../../common/type';
import { BORROWCARD_DATA } from '../constants';
import { BorrowWrapper } from '../style';
import { DefaultBtn } from '../../../common/components/Button';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import { PiFileTextThin } from 'react-icons/pi';

function BorrowList() {
  const [isOpen, setIsOpen] = useState(false);
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState<borrowCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  // const [totalItemsCount, setTotalItemsCount] = useState(BORROWCARD_DATA.length);
  const [currentStatus, setCurrentStatus] = useState('');
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

  useEffect(() => {
    fetchItemsForPage(currentPage, currentStatus);
    // 페이지 번호를 인수로 받아 해당 페이지에 해당하는 데이터를 가져오는 방식
  }, [currentPage, currentStatus]);

  const fetchItemsForPage = async (page: number, status: string) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredItems = BORROWCARD_DATA.filter(
      (item) => item.status === status,
    );
    const slicedItems = filteredItems.slice(startIndex, endIndex);
    setItems(slicedItems);
    setTotalItemsCount(filteredItems.length);
  };
  // try {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/api/reservations/`,
  //     {
  //       params: {
  //         size: itemsPerPage,
  //         page: currentPage,
  //         status: status,
  //       },
  //     },
  //   ); // 실제 API 엔드포인트에 맞게 수정
  //   console.log(Array.isArray(response.data));
  //   setItems(response.data.responses);
  //   setTotalItemsCount(response.data.listSize);
  //   console.log('currentPage:', currentPage);
  //   console.log('totalElements:', response.data);
  //   console.log('response:', response.data.responses);
  // } catch (error) {
  //   console.error('Error fetching wishlist:', error);
  // }

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
  const handleInUseItems = () => {
    handlePageChange(currentPage);
    setIsOpen(true);
  };

  const handleCompletedItems = () => {
    handlePageChange(currentPage);
    setIsOpen(true);
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
      </BorrowWrapper>
      빌린 내역~!~!~!~!
      {items.map((item, index) => (
        <BorrowCard key={index} borrowCardData={item} />
      ))}
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

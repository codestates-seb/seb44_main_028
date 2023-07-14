import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import { WishListWrapper, LendListWrapper } from '../style';
import BorrowCard from '../../../common/components/MypageCard/BorrowCard';

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
        `${process.env.REACT_APP_API_URL}/api/members/interests`,
        { params: { memberId: 1, page, size: itemsPerPage } },
      ); // 실제 API 엔드포인트에 맞게 수정
      console.log(Array.isArray(response.data));
      setItems(response.data.responses);
      setTotalItemsCount(response.data.listSize);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <WishListWrapper>
      빌려준내역
      <LendListWrapper>
        <div>
          {items.map((item, index) => (
            <BorrowCard key={index} itemCardData={item} />
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

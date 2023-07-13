import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';

function LendList() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalItemsCount = items.length;
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
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // fetchItemsForPage(page);
  };
  return (
    <div>
      빌려준 내역:
      {/* {lendList.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))} */}
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

export default LendList;

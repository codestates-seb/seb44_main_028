import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';

function WishList() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // 서버에 API 요청을 보내는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/members/interests'); // 실제 API 엔드포인트에 맞게 수정
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchData(); // API 데이터 가져오기 함수 호출
  }, []);

  return (
    <div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      <div>관심목록</div>
      {/* 테이블 또는 아이템 카드 등으로 아이템 목록을 렌더링 */}
      {/* {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))} */}
      <Paging
        currentPage={1}
        onPageChange={(page) => console.log('Page changed:', page)}
        itemsPerPage={5}
        totalItemsCount={items.length}
      />
    </div>
  );
}
export default WishList;

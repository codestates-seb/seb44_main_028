import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import ItemCardList from '../../../common/components/ItemCard/ItemCardList';
import ItemCard from '../../../common/components/ItemCard/ItemCard';
import { ITEMCARD_DATA } from '../constants';
function WishList() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  useEffect(() => {
    // 서버에 API 요청을 보내는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://playpack.shop/api/members/interests',
        ); // 실제 API 엔드포인트에 맞게 수정
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchData(); // API 데이터 가져오기 함수 호출
  }, []);

  // 현재 페이지에 해당하는 아이템을 가져오는 함수
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ITEMCARD_DATA.slice(startIndex, endIndex);
  };
  // 페이지 변경 시 호출되는 함수
  const handelPageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      {/* {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))} */}
      <ItemCardList
        itemCardListTitle="관심목록"
        itemCardListContentData={getCurrentItems()}
      />
      <Paging
        currentPage={currentPage}
        onPageChange={handelPageChange}
        itemsPerPage={itemsPerPage}
        totalItemsCount={ITEMCARD_DATA.length}
      />
    </div>
  );
}
export default WishList;

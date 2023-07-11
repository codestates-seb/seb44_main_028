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
  const totalItemsCount = items.length;

  useEffect(() => {
    fetchItemsForPage(currentPage);
    // 페이지 번호를 인수로 받아 해당 페이지에 해당하는 데이터를 가져오는 방식
  }, []);
  const fetchItemsForPage = async (page: number) => {
    try {
      const response = await axios.get(
        'https://playpack.shop/api/members/interests/',
        { params: { memberId: 1, page, itemsPerPage } },
      ); // 실제 API 엔드포인트에 맞게 수정
      console.log(response.data);
      console.log(items);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchItemsForPage(page);
  };

  return (
    <div>
      {/* {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))} */}
      <ItemCardList
        itemCardListTitle="관심목록"
        itemCardListContentData={Array.isArray(items) ? items : []}
      />

      <Paging
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItemsCount={totalItemsCount}
      />
    </div>
  );
}
export default WishList;

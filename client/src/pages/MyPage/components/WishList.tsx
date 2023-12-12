import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';
import { WishListWrapper, WishCardWrapper } from '../style';
import ItemCard from '../../../common/components/ItemCard/ItemCard';
import useScrollToTop from '../../../common/utils/customHooks/useScrollToTop';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { ACCESS_TOKEN } from '../../Login/constants';

function WishList() {
  const decrypt = useDecryptToken();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [itemsPerPage] = useState(6);
  const [totalItemsCount, setTotalItemsCount] = useState(currentPage);
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

  useScrollToTop();

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
        `${process.env.REACT_APP_API_URL}/api/members/interests`,
        {
          params: { page: currentPage, size: itemsPerPage },
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      ); // 실제 API 엔드포인트에 맞게 수정
      // console.log(Array.isArray(response.data));

      setItems(response.data.responses);
      setTotalItemsCount(response.data.pageInfo.totalElements);

      console.log('currentPage:', currentPage);
      console.log('totalElements:', response.data);
      console.log('response:', response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <WishListWrapper>
        {/* {renderItems()} */}
        <WishCardWrapper>
          {items.map((item, index) => (
            <ItemCard key={index} itemCardData={item} />
          ))}
        </WishCardWrapper>{' '}
      </WishListWrapper>
      <div>
        <Paging
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItemsCount={totalItemsCount}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default WishList;

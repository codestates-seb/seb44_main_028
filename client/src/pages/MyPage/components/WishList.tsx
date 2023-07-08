import { useState, useEffect } from 'react';
import Paging from './Paging';
import ItemCard from '../../../common/components/ItemCard';

function WishList() {
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   // 서버에서 아이템 데이터를 가져오는 API 호출
  //   fetchItems()
  //     .then((data) => setItems(data))
  //     .catch((error) => console.error('Error fetching items:', error));
  // }, []);

  // const fetchItems = async () => {
  //   // 서버에서 아이템 데이터를 가져오는 비동기 로직
  //   const response = await fetch('');
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch items');
  //   }
  //   const data = await response.json();
  //   return data;
  // };
  return (
    <div>
      <ItemCard />
      {/* {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))} */}

      <Paging
        currentPage={1}
        onPageChange={(page) => console.log('Page changed:', page)}
        itemsPerPage={5}
        totalItemsCount={450}
      />
    </div>
  );
}
export default WishList;

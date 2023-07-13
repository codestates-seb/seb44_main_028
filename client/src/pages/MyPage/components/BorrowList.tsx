import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';

function BorrowList() {
  const [borrowList, setBorrowList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://playpack.shop/api/reservations',
        );
        setBorrowList(response.data);
      } catch (error) {
        console.error('Error fetching borrow list:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      빌린 내역~!~!~!~!
      {/* {borrowList.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))} */}
      <Paging
        currentPage={1}
        onPageChange={(page) => console.log('Page changed:', page)}
        itemsPerPage={5}
        totalItemsCount={borrowList.length}
      />
    </div>
  );
}
export default BorrowList;

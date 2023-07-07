import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import { ProfileType } from '../type';
function Paging({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  onChange,
}: ProfileType) {
  const [page, setPage] = useState(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
}

export default Paging;

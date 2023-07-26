import Pagination from 'react-js-pagination';
import { PagingType } from '../type';
import { PagingWrapper } from '../style';

const Paging = ({
  currentPage,
  onPageChange,
  itemsPerPage,
  totalItemsCount,
}: PagingType) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <PagingWrapper>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
      />
    </PagingWrapper>
  );
};

export default Paging;

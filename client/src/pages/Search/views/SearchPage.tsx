import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import SelectBox from '../../../common/components/SelectBox';
import ItemCard from '../../../common/components/ItemCard/ItemCard';
import { ItemCardProps } from '../../../common/type';
import {
  DISTANCE_DEFAULT_VALUE,
  DISTANCE_OPTIONS,
  PRODUCT_FILTER_OPTIONS,
} from '../../../common/constants';
import { SearchPageContainer, SearchProductListWrapper } from '../style';
import Loading from '../../../common/components/Loading';
import ErrorPage from '../../../common/components/ErrorPage';
const SearchPage = () => {
  const params = useParams();
  const [page, setPage] = useState(0);
  const size = 10;
  const { data, isLoading, error } = useQuery('searchProduct', async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/search`,
        {
          params: {
            keyword: params.searchContent,
            page: page,
            size: size,
          },
        },
      );
      console.log('res', res);
      return res.data;
    } catch (err) {
      console.log('err', err);
    }
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <SearchPageContainer>
      <SearchProductListWrapper>
        {data?.products.map((item: ItemCardProps) => (
          <ItemCard key={item.productId} itemCardData={item} />
        ))}
      </SearchProductListWrapper>
    </SearchPageContainer>
  );
};

export default SearchPage;

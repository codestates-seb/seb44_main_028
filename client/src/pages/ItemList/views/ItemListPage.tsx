import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import SelectBox from '../../../common/components/SelectBox';
import ItemCard from '../../../common/components/ItemCard/ItemCard';
import { ITEMCARD_DATA } from '../../Main/constants';
import { ItemListPageContainer } from '../style';
import Loading from '../../../common/components/Loading';
import {
  DISTANCE_DEFAULT_VALUE,
  DISTANCE_OPTIONS,
  PRODUCT_FILTER_OPTIONS,
} from '../../../common/constants';
import { ItemCardProps } from '../../../common/type';
import { useParams } from 'react-router-dom';

function ItemListPage() {
  const params = useParams();
  const [page, setPage] = useState(1);
  console.log(params);
  const size = 10;
  const {
    data: products,
    isLoading,
    error,
  } = useQuery('products', async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products`,
        {
          params: {
            page: page,
            size: size,
            category: params.categoryId,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }
  return (
    <ItemListPageContainer>
      {
        <div>
          <SelectBox
            selectOptionData={DISTANCE_OPTIONS}
            selectDefaultOption={DISTANCE_DEFAULT_VALUE}
          />
          <SelectBox selectOptionData={PRODUCT_FILTER_OPTIONS} />
        </div>
      }
      {products.map((product: ItemCardProps) => (
        <ItemCard key={product.id} itemCardData={product} />
      ))}
    </ItemListPageContainer>
  );
}
export default ItemListPage;

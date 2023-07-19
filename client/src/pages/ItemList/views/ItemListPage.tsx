import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import SelectBox from '../../../common/components/SelectBox';
import ItemCard from '../../../common/components/ItemCard/ItemCard';
import Loading from '../../../common/components/Loading';
import {
  DISTANCE_DEFAULT_VALUE,
  DISTANCE_OPTIONS,
  PRODUCT_FILTER_OPTIONS,
} from '../../../common/constants';
import { ItemCardProps } from '../../../common/type';
import { useParams } from 'react-router-dom';
import NoData from '../../../common/components/NoData';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import { ItemListPageContainer, ProductListWrapper } from '../style';

function ItemListPage() {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [distanceSelectedValue, setDistanceSelectedValue] = useState(
    DISTANCE_DEFAULT_VALUE,
  );
  const [productFilterSelectedValue, setProductFilterSelectedValue] = useState(
    PRODUCT_FILTER_OPTIONS[0].label,
  );
  //const {data: userDate} = useGetMe();

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
            categoryId: params.categoryId,
            sortBy: 'createdAt',
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
    return <div>에러가 발생했습니다.</div>;
  }
  if (products.products.length === 0) {
    return <NoData />;
  }
  console.log(products);

  useEffect(() => {
    // 멤버 유저 아닌 경우
    // 로그인 페이지로 리다이렉트
    // 멤버 유저인데 위치 정보 없는 경우
    // 위치 정보 수정 페이지로 리다이렉트
  }, []);
  return (
    <ItemListPageContainer>
      {
        <div>
          <SelectBox
            setSelectedValue={setDistanceSelectedValue}
            selectedValue={distanceSelectedValue}
            selectOptionData={DISTANCE_OPTIONS}
            selectDefaultOption={DISTANCE_DEFAULT_VALUE}
          />
          <SelectBox
            selectedValue={productFilterSelectedValue}
            setSelectedValue={setProductFilterSelectedValue}
            selectOptionData={PRODUCT_FILTER_OPTIONS}
          />
        </div>
      }
      {products?.products.map((product: ItemCardProps) => (
        <ItemCard key={product.productId} itemCardData={product} />
      ))}
    </ItemListPageContainer>
  );
}
export default ItemListPage;

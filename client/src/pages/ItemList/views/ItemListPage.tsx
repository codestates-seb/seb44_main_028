import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
import NoData from '../../../common/components/NoData';
import ErrorPage from '../../../common/components/ErrorPage';
import { ItemListPageContainer, ProductListWrapper } from '../style';

function ItemListPage() {
  const params = useParams();
  const [page, setPage] = useState(1);
  const size = 3;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<ItemCardProps[]>([]);
  const {
    data: products,
    isLoading,
    error,
    isFetching,
  } = useQuery(['products', page], async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products`,
        {
          params: {
            page: page,
            size: size,
            categoryId: params.categoryId,
          },
        },
      );
      setItems((prevIetm) => [...prevIetm, ...res.data.products]);
      return res.data.products;
    } catch (err) {
      console.log('err', err);
    }
  });

  useEffect(() => {
    function handleScroll() {
      if (
        containerRef.current &&
        containerRef.current.getBoundingClientRect().bottom <=
          window.innerHeight
      ) {
        if (!isFetching) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

  if (isLoading && page === 1) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!isLoading && items?.length === 0) {
    return <NoData />;
  }
  console.log(products);
  return (
    <ItemListPageContainer>
      <div>
        <SelectBox
          selectOptionData={DISTANCE_OPTIONS}
          selectDefaultOption={DISTANCE_DEFAULT_VALUE}
        />
        <SelectBox selectOptionData={PRODUCT_FILTER_OPTIONS} />
      </div>
      <ProductListWrapper ref={containerRef}>
        {items?.map((product: ItemCardProps) => (
          <ItemCard key={product.productId} itemCardData={product} />
        ))}
      </ProductListWrapper>
      {isFetching && <Loading />}
    </ItemListPageContainer>
  );
}

export default ItemListPage;

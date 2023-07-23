import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ItemCard from '../../../common/components/ItemCard/ItemCard';
import { ItemCardProps } from '../../../common/type';
import { SearchPageContainer, SearchProductListWrapper } from '../style';
import Loading from '../../../common/components/Loading';
import ErrorPage from '../../../common/components/ErrorPage';
import NoData from '../../../common/components/NoData';
import ItemCardWrapper from '../../ItemList/components/ItemCardWrapper';
const SearchPage = () => {
  const params = useParams();
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<ItemCardProps[]>([]);
  const size = 10;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, error, isFetching } = useQuery(
    'searchProduct',
    async () => {
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
        const newDatas = res.data.products;
        const filteredProducts = newDatas.filter(
          (newData: ItemCardProps) =>
            !items.some((item) => item.productId === newData.productId),
        );
        setItems((prevIetm) => [...prevIetm, ...filteredProducts]);
        console.log('res', res);
        return res.data;
      } catch (err) {
        console.log('err', err);
      }
    },
  );
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
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }
  if (!isLoading && items?.length === 0) {
    return <NoData />;
  }
  return (
    <SearchPageContainer>
      <SearchProductListWrapper ref={containerRef}>
        <AnimatePresence>
          {data?.products.map((item: ItemCardProps) => (
            <motion.div
              key={item.productId}
              ref={containerRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ItemCardWrapper key={item.productId}>
                <ItemCard key={item.productId} itemCardData={item} />
              </ItemCardWrapper>
            </motion.div>
          ))}
        </AnimatePresence>
      </SearchProductListWrapper>
      {isFetching && <Loading />}
    </SearchPageContainer>
  );
};

export default SearchPage;

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import SelectBox from '../../../common/components/SelectBox';
import ItemCard from '../../../common/components/ItemCard/ItemCard';
import Loading from '../../../common/components/Loading';
import {
  ACCESS_TOKEN,
  DISTANCE_DEFAULT_VALUE,
  DISTANCE_OPTIONS,
  PRODUCT_FILTER_OPTIONS,
} from '../../../common/constants';
import { queryParams } from '../type';
import { ItemCardProps } from '../../../common/type';
import ItemCardWrapper from '../components/ItemCardWrapper';
import NoData from '../../../common/components/NoData';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import ErrorPage from '../../../common/components/ErrorPage';
import { ItemListPageContainer, ProductListWrapper } from '../style';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import useScrollToTop from '../../../common/utils/customHooks/useScrollToTop';

function ItemListPage() {
  useScrollToTop();
  const params = useParams();
  const navigate = useNavigate();
  const [distanceSelectedValue, setDistanceSelectedValue] = useState(
    DISTANCE_DEFAULT_VALUE,
  );
  const [productFilterSelectedValue, setProductFilterSelectedValue] = useState(
    PRODUCT_FILTER_OPTIONS[0].label,
  );

  const { data: userData } = useGetMe();
  const [page, setPage] = useState(0);
  const size = 5;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<ItemCardProps[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [queryParams, setQueryParams] = useState<queryParams>({
    categoryId: params.categoryId,
    sortBy: PRODUCT_FILTER_OPTIONS.find(
      (option) => option.label === productFilterSelectedValue,
    )?.value,
    size: size,
  });
  useEffect(() => {
    const decrypt = useDecryptToken();
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN);
    if (encryptedAccessToken) {
      const decryptedToken = decrypt(encryptedAccessToken);
      setAccessToken(decryptedToken);
    }
  }, []);

  const {
    data: products,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery(
    [
      queryParams.categoryId,
      queryParams.sortBy,
      queryParams.distance,
      page,
      queryParams.size,
    ],
    async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products?page=${page}&size=${queryParams.size}`,
          {
            params: {
              categoryId: queryParams.categoryId,
              sortBy: queryParams.sortBy,
              distance: queryParams.distance,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setItems((prevIetm) => [...prevIetm, ...res.data.products]);
      } catch (err) {
        console.log('err', err);
      }
    },
  );

  useEffect(() => {
    // 멤버 유저 아닌 경우
    if (!userData && distanceSelectedValue !== DISTANCE_DEFAULT_VALUE) {
      navigate('/login');
    }
    // 멤버 유저인데 위치 정보 없는 경우
    if (userData && !userData.address) {
      navigate('/mypage');
    }
    const distanceSelect = DISTANCE_OPTIONS.find(
      (option) => option.label === distanceSelectedValue,
    )?.value;

    setQueryParams((prevParams) => ({
      ...prevParams,
      sortBy: PRODUCT_FILTER_OPTIONS.find(
        (option) => option.label === productFilterSelectedValue,
      )?.value,
      distance: distanceSelect || undefined,
    }));
    setPage(0);
  }, [distanceSelectedValue, productFilterSelectedValue]);

  useEffect(() => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      sortBy: PRODUCT_FILTER_OPTIONS.find(
        (option) => option.label === productFilterSelectedValue,
      )?.value,
    }));
    setPage(0);
  }, [productFilterSelectedValue]);

  useEffect(() => {
    const distanceSelect = DISTANCE_OPTIONS.find(
      (option) => option.label === distanceSelectedValue,
    )?.value;
    setQueryParams((prevParams) => ({
      ...prevParams,
      distance: distanceSelect || undefined,
    }));
    setPage(0);
  }, [distanceSelectedValue]);
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

  useEffect(() => {
    refetch();
  }, [page, queryParams]);
  useEffect(() => {
    setItems([]);
  }, [queryParams]);
  if (isLoading && page === 1) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!isLoading && items?.length === 0) {
    return <NoData />;
  }
  return (
    <ItemListPageContainer>
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
      <ProductListWrapper ref={containerRef}>
        <AnimatePresence>
          {items?.map((product: ItemCardProps) => (
            <motion.div
              key={product.productId}
              ref={containerRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ItemCardWrapper key={product.productId}>
                <ItemCard itemCardData={product} />
              </ItemCardWrapper>
            </motion.div>
          ))}
        </AnimatePresence>
      </ProductListWrapper>
      {isFetching && <Loading />}
    </ItemListPageContainer>
  );
}

export default ItemListPage;

import { useQuery } from 'react-query';
import axios from 'axios';
import ScrollToTop from '../../../common/components/ScrollToTop';
import Category from '../../../common/components/Category/Category';
import { MainPageContainer } from '../style';
import ItemCardList from '../../../common/components/ItemCard/ItemCardList';
import { ITEMCARDLIST_TITLE, ITEMCARD_DEVELOPMENT_DATA } from '../constants';
import Loading from '../../../common/components/Loading';
import ErrorPage from '../../../common/components/ErrorPage';
import useScrollToTop from '../../../common/utils/customHooks/useScrollToTop';

function MainPage() {
  useScrollToTop();
  const fetchFeaturedProducts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/featured`,
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery(
    'featuredProducts',
    fetchFeaturedProducts,
  );
  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  console.log(data);
  return (
    <MainPageContainer>
      <Category />
      <ScrollToTop />

      <ItemCardList
        itemCardListTitle={ITEMCARDLIST_TITLE[0]}
        itemCardListContentData={data.top3ByTotalRateScoreRatio}
      />
      <ItemCardList
        itemCardListTitle={ITEMCARDLIST_TITLE[1]}
        itemCardListContentData={data.top3ByViewCount}
      />
      <ItemCardList
        itemCardListTitle={ITEMCARDLIST_TITLE[2]}
        itemCardListContentData={data.top3ByBaseFeeZero}
      />
      <ItemCardList
        itemCardListTitle={ITEMCARDLIST_TITLE[3]}
        itemCardListContentData={ITEMCARD_DEVELOPMENT_DATA}
      />
    </MainPageContainer>
  );
}
export default MainPage;

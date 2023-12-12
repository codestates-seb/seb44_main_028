import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WritePost from '../../Create/components/WritePost';
import Loading from '../../../common/components/Loading';
import ErrorPage from '../../../common/components/ErrorPage';
import { QUERY_KEY } from '../../../common/utils/queryKet';
function UpdatePage() {
  const param = useParams();

  const { data, isLoading, error } = useQuery(
    QUERY_KEY.UPDATE_DETAIL,
    async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/${param.itemId}`,
      );
      return data;
    },
  );
  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;
  return (
    <div>
      <WritePost productData={data} />
    </div>
  );
}
export default UpdatePage;

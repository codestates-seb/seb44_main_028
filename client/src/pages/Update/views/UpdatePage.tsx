import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WritePost from '../../Create/components/WritePost';
function UpdatePage() {
  const param = useParams();

  const { data, isLoading, error } = useQuery('updateDetail', async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/${param.itemId}`,
    );
    return data;
  });
  return (
    <div>
      <WritePost productData={data} />
    </div>
  );
}
export default UpdatePage;

import { useQuery } from 'react-query';
import CategoryButton from './CategoryButton';
import { CategoryContainer } from '../../style/style';
import axios from 'axios';
import Loading from '../Loading';
import { ICategory } from '../../model/ICategory';
import ErrorPage from '../ErrorPage';
import { QUERY_KEY } from '../../utils/queryKet';

const Category = () => {
  const fetchCategoryData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/categories`,
    );
    return response.data;
  };
  const {
    data: category,
    isLoading,
    isError,
  } = useQuery<ICategory[]>(QUERY_KEY.CATEGORY, fetchCategoryData);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <CategoryContainer>
      {category?.map((categoryBtn) => (
        <CategoryButton
          key={categoryBtn.categoryId}
          ImageId={categoryBtn.categoryId}
          imageUrl={categoryBtn.image}
          imageName={categoryBtn.title}
        />
      ))}
    </CategoryContainer>
  );
};

export default Category;

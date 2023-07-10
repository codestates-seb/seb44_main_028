import { useQuery } from 'react-query';
import CategoryButton from './CategoryButton';
import { CATEGORY } from '../../constants';
import { CategoryContainer } from '../../style/style';
import axios from 'axios';
import Loading from '../Loading';
import { ICategory } from '../../model/ICategory';

const Category = () => {
  const fetchCategoryData = async () => {
    const response = await axios.get('/api/categories');
    return response.data;
  };
  const {
    data: category,
    isLoading,
    isError,
  } = useQuery<ICategory[]>('categories', fetchCategoryData);

  // if (isLoading) {
  //   return <Loading />;
  // }
  //   <CategoryContainer>
  //   {category.map((categoryBtn) => (
  //     <CategoryButton
  //       imageUrl={categoryBtn.image}
  //       imageName={categoryBtn.title}
  //     />
  //   ))}
  // </CategoryContainer>
  return (
    <CategoryContainer>
      {CATEGORY.map((categoryBtn) => (
        <CategoryButton
          ImageId={categoryBtn.id}
          imageUrl={categoryBtn.image}
          imageName={categoryBtn.name}
        />
      ))}
    </CategoryContainer>
  );
};

export default Category;

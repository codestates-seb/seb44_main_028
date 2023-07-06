import CategoryButton from './CategoryButton';
import { CATEGORY } from '../../constants';
import { CategoryContainer } from '../../style/style';

const Category = () => {
  return (
    <CategoryContainer>
      {CATEGORY.map((categoryBtn) => (
        <CategoryButton
          imageUrl={categoryBtn.image}
          imageName={categoryBtn.name}
        />
      ))}
    </CategoryContainer>
  );
};

export default Category;

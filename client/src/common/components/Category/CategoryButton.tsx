import { CategoryButtonProps } from '../../type';
import { CategoryButtonWrapper } from '../../style/style';
import { useNavigate } from 'react-router-dom';
const CategoryButton: React.FC<CategoryButtonProps> = ({
  ImageId,
  imageUrl,
  imageName,
}: CategoryButtonProps) => {
  const navigate = useNavigate();
  const handleViewItemList = () => {
    navigate(`/itemlist/${ImageId}`);
  };

  return (
    <CategoryButtonWrapper onClick={handleViewItemList}>
      <img src={imageUrl}></img>
      <p>{imageName}</p>
    </CategoryButtonWrapper>
  );
};

export default CategoryButton;

import React from 'react';
import { CategoryButtonProps } from '../../type';
import { CategoryButtonWrapper } from '../../style/style';
const CategoryButton: React.FC<CategoryButtonProps> = ({
  imageUrl,
  imageName,
}: CategoryButtonProps) => {
  return (
    <CategoryButtonWrapper>
      <img src={imageUrl}></img>
      <p>{imageName}</p>
    </CategoryButtonWrapper>
  );
};

export default CategoryButton;

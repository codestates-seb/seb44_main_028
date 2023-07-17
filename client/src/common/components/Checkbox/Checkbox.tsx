import React from 'react';
import { CheckBoxWrapper } from '../../style/style';
import { CheckBoxProps } from '../../type';

type CheckBox = {
  categoryId: string;
  title: string;
  image: string;
};
const CheckBox = ({
  categoryTitle,
  categoryId,
  selectedtCategory,
  setSelectedCategory,
}: CheckBoxProps) => {
  const isSelected = selectedtCategory.includes(categoryId);

  const handleIsClick = () => {
    if (selectedtCategory.includes(categoryId)) {
      setSelectedCategory((prevCategories) =>
        prevCategories.filter((category) => category !== categoryId),
      );
    } else {
      setSelectedCategory((prevCategories) => [...prevCategories, categoryId]);
    }
  };
  return (
    <CheckBoxWrapper onClick={handleIsClick} isSelected={isSelected}>
      {categoryTitle}
    </CheckBoxWrapper>
  );
};

export default CheckBox;

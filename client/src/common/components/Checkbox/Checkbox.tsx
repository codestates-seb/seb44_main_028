import { CheckBoxWrapper } from '../../style/style';
import { CheckBoxProps } from '../../type';

const CheckBox = ({
  categoryData,
  selectedtCategory,
  setSelectedCategory,
}: CheckBoxProps) => {
  const isSelected = selectedtCategory.includes(categoryData);

  const handleIsClick = () => {
    if (selectedtCategory.includes(categoryData)) {
      setSelectedCategory((prevCategories) =>
        prevCategories.filter((category) => category !== categoryData),
      );
    } else {
      setSelectedCategory((prevCategories) => [
        ...prevCategories,
        categoryData,
      ]);
    }
  };
  return (
    <CheckBoxWrapper onClick={handleIsClick} isSelected={isSelected}>
      {categoryData}
    </CheckBoxWrapper>
  );
};

export default CheckBox;

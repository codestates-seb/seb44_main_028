import { CheckBoxWrapper } from '../../style/style';
import { CheckBoxProps } from '../../type';

const CheckBox = ({
  categoryData,
  selectedCategories,
  setSelectedCategories,
}: CheckBoxProps) => {
  const isSelected = selectedCategories.includes(categoryData);

  const handleIsClick = () => {
    if (selectedCategories.includes(categoryData)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== categoryData),
      );
    } else {
      setSelectedCategories((prevCategories) => [
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

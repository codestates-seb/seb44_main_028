import { useState } from 'react';
import { CATEGORY } from '../../constants';
import { CheckBoxListContainer } from '../../style/style';
import CheckBox from './CheckBox';

const CheckBoxList = () => {
  const [seletedCategories, setSelectedCategories] = useState<string[]>([]);
  console.log(seletedCategories);
  return (
    <CheckBoxListContainer>
      {CATEGORY.map((category, index) => {
        return (
          <CheckBox
            key={index}
            categoryData={category.name}
            selectedCategories={seletedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        );
      })}
    </CheckBoxListContainer>
  );
};

export default CheckBoxList;

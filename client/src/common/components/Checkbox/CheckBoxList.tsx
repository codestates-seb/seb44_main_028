import { useState } from 'react';
import { CATEGORY } from '../../constants';
import CheckBox from './CheckBox';

const CheckBoxList = () => {
  const [seletedCategories, setSelectedCategories] = useState<string[]>([]);
  console.log(seletedCategories);
  return (
    <div>
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
    </div>
  );
};

export default CheckBoxList;

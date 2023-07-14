import { CATEGORY } from '../../constants';
import CheckBox from './CheckBox';
import { CategoryListProps } from '../../type';
const CheckBoxList = ({
  selectedtCategory,
  setSelectedCategory,
}: CategoryListProps) => {
  return (
    <div>
      {CATEGORY.map((category, index) => {
        return (
          <CheckBox
            key={index}
            categoryData={category.name}
            selectedtCategory={selectedtCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      })}
    </div>
  );
};

export default CheckBoxList;

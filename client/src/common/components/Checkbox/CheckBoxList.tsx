import { CATEGORY } from '../../constants';
import { CheckBoxListContainer } from '../../style/style';
import CheckBox from './Checkbox';

const CheckBoxList = () => {
  return (
    <CheckBoxListContainer>
      {CATEGORY.map((category, index) => {
        return <CheckBox key={index} categoryData={category} />;
      })}
    </CheckBoxListContainer>
  );
};

export default CheckBoxList;

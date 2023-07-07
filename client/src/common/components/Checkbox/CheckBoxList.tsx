import { CATEGORY } from '../../constants';
import { CheckBoxListContainer } from '../../style/style';
import CheckBox from './CheckBox';

const CheckBoxList = () => {
  return (
    <CheckBoxListContainer>
      {CATEGORY.map((category, index) => {
        return <CheckBox key={index} categoryData={category.name} />;
      })}
    </CheckBoxListContainer>
  );
};

export default CheckBoxList;

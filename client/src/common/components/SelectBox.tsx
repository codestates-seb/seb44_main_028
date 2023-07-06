import { DISTANCE_OPTIONS } from '../constants';
import { SelectBoxWrapper, SelectOption } from '../style/style';
const SelectBox = () => {
  return (
    <SelectBoxWrapper>
      {DISTANCE_OPTIONS.map((option, index) => (
        <SelectOption key={index} value={option.value}>
          {option.label}
        </SelectOption>
      ))}
    </SelectBoxWrapper>
  );
};

export default SelectBox;

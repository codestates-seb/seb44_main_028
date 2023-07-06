import { DISTANCE_OPTIONS } from '../constants';
import { MdOutlineExpandMore } from 'react-icons/md';
import {
  SelectBoxWrapper,
  Selected,
  SelectedValue,
  OptionWrapper,
  Option,
} from '../style/style';
const SelectBox = () => {
  return (
    <SelectBoxWrapper>
      <Selected>
        <SelectedValue>내 주변 보기</SelectedValue>
        <MdOutlineExpandMore />
      </Selected>
      <OptionWrapper>
        {DISTANCE_OPTIONS.map((option, index) => (
          <Option key={index}>{option.label}</Option>
        ))}
      </OptionWrapper>
    </SelectBoxWrapper>
  );
};

export default SelectBox;

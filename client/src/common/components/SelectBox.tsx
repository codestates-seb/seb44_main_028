import { useState } from 'react';
import { DISTANCE_DEFAULT_VALUE, DISTANCE_OPTIONS } from '../constants';
import { MdOutlineExpandMore } from 'react-icons/md';
import {
  SelectBoxWrapper,
  Selected,
  SelectedValue,
  OptionWrapper,
  Option,
} from '../style/style';
const SelectBox = () => {
  const [onClick, setOnClick] = useState(false);
  const [selectedValue, setSelectedValue] = useState(DISTANCE_DEFAULT_VALUE);
  const onClickHandler = () => {
    setOnClick(!onClick);
  };
  const selectOption = (e: React.MouseEvent<HTMLLIElement>) => {
    const optionValue = e.currentTarget.innerText;
    setSelectedValue(optionValue);
  };
  return (
    <SelectBoxWrapper onClick={onClickHandler}>
      <Selected>
        <SelectedValue>{selectedValue}</SelectedValue>
        <MdOutlineExpandMore />
      </Selected>
      {onClick && (
        <OptionWrapper>
          {DISTANCE_OPTIONS.map((option, index) => (
            <Option key={index} onClick={selectOption}>
              {option.label}
            </Option>
          ))}
        </OptionWrapper>
      )}
    </SelectBoxWrapper>
  );
};

export default SelectBox;

import { useState, useRef, useEffect } from 'react';
import { MdOutlineExpandMore } from 'react-icons/md';
import { SelectOption } from '.././type';
import {
  SelectBoxWrapper,
  Selected,
  SelectedValue,
  OptionWrapper,
  Option,
} from '../style/style';
const SelectBox = ({
  selectOptionData,
  selectDefaultOption,
}: {
  selectOptionData: SelectOption[];
  selectDefaultOption?: string;
}) => {
  const [onClick, setOnClick] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    selectDefaultOption || selectOptionData[0].label,
  );
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const onClickHandler = () => {
    setOnClick(!onClick);
  };
  const selectOption = (e: React.MouseEvent<HTMLLIElement>) => {
    const optionValue = e.currentTarget.innerText;
    setSelectedValue(optionValue);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (
      selectBoxRef.current &&
      !selectBoxRef.current.contains(e.target as Node)
    ) {
      setOnClick(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <SelectBoxWrapper onClick={onClickHandler} ref={selectBoxRef}>
      <Selected isClick={onClick}>
        <SelectedValue>{selectedValue}</SelectedValue>
        <MdOutlineExpandMore />
      </Selected>
      <OptionWrapper isClick={onClick}>
        {selectOptionData.map((option, index) => (
          <Option key={index} onClick={selectOption}>
            {option.label}
          </Option>
        ))}
      </OptionWrapper>
    </SelectBoxWrapper>
  );
};

export default SelectBox;

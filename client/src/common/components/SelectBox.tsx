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
  selectedValue,
  setSelectedValue,
  selectOptionData,
  selectDefaultOption,
}: {
  selectedValue?: string;
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>;
  selectOptionData: SelectOption[] | undefined;
  selectDefaultOption?: string;
}) => {
  const [onClick, setOnClick] = useState(false);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  console.log(selectOptionData);
  const onClickHandler = () => {
    setOnClick(!onClick);
  };
  const selectOption = (e: React.MouseEvent<HTMLLIElement>) => {
    const optionValue = e.currentTarget.innerText as string;
    console.log(optionValue);
    optionValue && setSelectedValue?.(optionValue);
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
        {selectOptionData?.map((option, index) => (
          <Option key={index} onClick={selectOption}>
            {option.label}
          </Option>
        ))}
      </OptionWrapper>
    </SelectBoxWrapper>
  );
};

export default SelectBox;

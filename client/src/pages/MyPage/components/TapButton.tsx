import React from 'react';
import { SwitchBtn, CustomTapButton } from '../style';
import ParentTap from './ParentTap';
import { TapButtonType } from '../type';
import { fetchList } from './fetchList';

function TapButton({
  nowActivatedTabValue,
  handleNowActivatedTabValue,
}: TapButtonType) {
  return (
    <SwitchBtn>
      <CustomTapButton
        className={nowActivatedTabValue === 'firstBtn' ? 'btnL' : 'btnR'}
        value="firstBtn"
        onClick={(e) => {
          handleNowActivatedTabValue((e.target as HTMLButtonElement).value);
        }}
      >
        빌려준 내역
      </CustomTapButton>

      <CustomTapButton
        className={nowActivatedTabValue === 'secondBtn' ? 'btnL' : 'btnR'}
        value="secondBtn"
        onClick={(e) => {
          handleNowActivatedTabValue((e.target as HTMLButtonElement).value);
        }}
      >
        빌린 내역
      </CustomTapButton>
      <CustomTapButton
        className={nowActivatedTabValue === 'thirdBtn' ? 'btnL' : 'btnR'}
        value="thirdBtn"
        onClick={(e) => {
          handleNowActivatedTabValue((e.target as HTMLButtonElement).value);
        }}
      >
        관심 목록
      </CustomTapButton>
    </SwitchBtn>
  );
}

export default TapButton;

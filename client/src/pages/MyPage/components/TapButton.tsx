import React, { useState } from 'react';
import { CustomTapButton } from '../style';
import WishList from './WishList';
import { TapButtonType } from '../type';

function TapButton({ tap, setTapList }: TapButtonType) {
  const [interestList, setInterestList] = useState<string[]>([]);
  const addInterestCard = (imageUrl: string) => {
    setInterestList((prevList) => [...prevList, imageUrl]);
  };
  const handleNowTapValue = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = event;
    if (currentTarget) {
      setTapList(() => [currentTarget.innerText]);
    }
    console.log(tap);
  };

  return (
    <>
      <CustomTapButton onClick={handleNowTapValue}>{tap}</CustomTapButton>
      {/* <WishList /> */}
    </>
  );
}

export default TapButton;

import React from 'react';
import { colorPalette } from '../../utils/enum/colorPalette';
import { useEffect, useState, useCallback } from 'react';
import { DefaultBtn } from '../Button';
import { lendCardProps } from '../../type';
import axios from 'axios';
import {
  LendCardWrapper,
  LendDatesWrapper,
  LendButtonWapper,
  LendTitleWrapper,
  LendImgWrapper,
  LendContentWrapper,
  ItemImage,
} from '../../style/style';
import { ACCESS_TOKEN } from '../../constants';
import useDecryptToken from '../../utils/customHooks/useDecryptToken';
import useGetMe from '../../utils/customHooks/useGetMe';
import { processDataWithRegex } from '../../utils/helperFunctions/processDataWithRegex';

const LendCard = ({ lendCardData }: { lendCardData: lendCardProps }) => {
  const decrypt = useDecryptToken();
  const { data: userData } = useGetMe();
  console.log('userData', userData);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reservations/members`,
        );
        const processedItems = response.data.map((item: lendCardProps) => {
          const { startDate, endDate } = processDataWithRegex(item.startDate);
          return { ...item, startDate, endDate };
        });

        setItems(processedItems);
      } catch (error) {
        console.error('아이템을 불러올 수없습니다.', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <LendCardWrapper>
        <LendImgWrapper>
          <ItemImage src={lendCardData.image} />
        </LendImgWrapper>
        <LendContentWrapper>
          <LendTitleWrapper>{lendCardData.username}</LendTitleWrapper>
          <LendDatesWrapper>
            <div>예약기간</div>
            {status === 'CANCELED' ? (
              <div>{`${lendCardData.startDate}`}</div>
            ) : (
              <div>{`${lendCardData.startDate} - ${lendCardData.endDate}`}</div>
            )}
          </LendDatesWrapper>
          <LendButtonWapper>
            {status === 'REQUESTED' && (
              <DefaultBtn
                color={colorPalette.whiteColor}
                backgroundColor={colorPalette.deepMintColor}
              >
                예약 확정
              </DefaultBtn>
            )}
            {status === 'REQUESTED' && (
              <DefaultBtn
                color={colorPalette.whiteColor}
                backgroundColor={colorPalette.cancleButtonColor}
              >
                거절 하기
              </DefaultBtn>
            )}
          </LendButtonWapper>
        </LendContentWrapper>
      </LendCardWrapper>
    </>
  );
};
export default LendCard;

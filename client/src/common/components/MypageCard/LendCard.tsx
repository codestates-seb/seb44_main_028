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

const LendCard = ({
  lendCardData,
  setIsItemCardClicked,
}: {
  lendCardData: lendCardProps;
  isItemCardClicked: boolean;
  setIsItemCardClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log('lendCardData:', lendCardData);
  const decrypt = useDecryptToken();
  const { data: userData } = useGetMe();
  console.log('userData', userData);
  const [items, setItems] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('');

  console.log('currentStatus:', currentStatus);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/members`,
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

  //예약 확정 요청
  const reservationConfirmed = async (
    reservationId: string,
    productId: string,
  ) => {
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN) || '';
    const accessToken = decrypt(encryptedAccessToken);

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/reservations/${reservationId}/products/${productId}/accept`,
        { params: { staus: 'RESERVED' } },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    } catch (error) {
      console.error('예약 확정을 할 수 없습니다.', error);
    }
  };

  //   const productCancel = async (productId: string, reservationId: string) => {
  //     const encryptedAccessToken: string | null =
  //       localStorage.getItem(ACCESS_TOKEN) || '';
  //     const accessToken = decrypt(encryptedAccessToken);

  //     try {
  //       await axios.patch(
  //         `${process.env.REACT_APP_API_URL}/api/reservations/${reservationId}/products/${productId}/cancel`,
  //         { status: 'CANCELED' }, // Send the status in the request body directly
  //         { headers: { Authorization: `Bearer ${accessToken}` } },
  //       );

  //       // Update the status of the canceled reservation in the items array
  //       setItems((prevItems) =>
  //         prevItems.map((item) =>
  //           item.reservationId === reservationId && item.productId === productId
  //             ? { ...item, status: 'CANCELED' }
  //             : item,
  //         ),
  //       );
  //     } catch (error) {
  //       console.error('취소 요청을 보내는데 실패했습니다.', error);
  //     }
  //   };
  //  const handleProductCancel = () => {
  //     if (lendCardData.productId && lendCardData.reservationId) {
  //       productCancel(lendCardData.productId, lendCardData.reservationId);
  //     }
  //   };

  const handleProductClick = (e: any) => {
    setCurrentStatus('REQUESTED');
    setIsItemCardClicked(true);
    console.log('handleProductClick을 눌렀습니다.:', e.target.value);
  };

  return (
    <>
      <LendCardWrapper onClick={handleProductClick}>
        <LendImgWrapper>
          <ItemImage src={lendCardData.image} />
        </LendImgWrapper>
        <LendContentWrapper>
          <LendTitleWrapper>{lendCardData.username}</LendTitleWrapper>
          <LendDatesWrapper>
            <div>예약기간</div>
            {lendCardData.status === 'CANCELED' ? (
              <div>{`${lendCardData.startDate}`}</div>
            ) : (
              <div>{`${lendCardData.startDate} - ${lendCardData.endDate}`}</div>
            )}
          </LendDatesWrapper>
          <LendButtonWapper>
            {lendCardData.status === 'REQUESTED' && (
              <DefaultBtn
                color={colorPalette.whiteColor}
                backgroundColor={colorPalette.deepMintColor}
              >
                예약 확정
              </DefaultBtn>
            )}
            {lendCardData.status === 'REQUESTED' && (
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

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
  LendPeriod,
  LendImgWrapper,
  LendContentWrapper,
  ItemImage,
} from '../../style/style';
import { ACCESS_TOKEN } from '../../constants';
import useDecryptToken from '../../utils/customHooks/useDecryptToken';
import useGetMe from '../../utils/customHooks/useGetMe';
import { processDataWithRegex } from '../../utils/helperFunctions/processDataWithRegex';
import { ILendCard } from '../../model/ILendCard';

const LendCard = ({
  lendCardData,
  setIsItemCardClicked,
  setSelectedLendCard,
  currentStatus,
  setCurrentStatus,
  isItemCardClicked,
}: {
  lendCardData: lendCardProps;
  isItemCardClicked?: boolean;
  setIsItemCardClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLendCard: React.Dispatch<
    React.SetStateAction<lendCardProps | null>
  >;
  currentStatus?: string | undefined;
  setCurrentStatus?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  console.log('lendCardData:', lendCardData);
  const decrypt = useDecryptToken();
  const { data: userData } = useGetMe();
  console.log('userData', userData);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [reservation, setReservation] = useState<ILendCard[]>([]);
  const [requestList, setReqeustList] = useState([]);
  const [confirmList, setConfirmList] = useState([]);
  const [rejectedList, setRejectedList] = useState([]);
  const [pastList, setPastList] = useState([]);

  console.log('currentStatus:', currentStatus);

  useEffect(() => {
    const fetchItems = async () => {
      const encryptedAccessToken: string | null =
        localStorage.getItem(ACCESS_TOKEN) || '';
      const accessToken = decrypt(encryptedAccessToken);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reservations/products/${lendCardData.productId}`,
          {
            params: { size: 9, page: page, status: currentStatus },

            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        if (currentStatus === 'REQUESTED') {
          setReqeustList(response.data.reservations);
        } else if (currentStatus === 'RESERVED') {
          setReqeustList(response.data.reservations);
        } else if (currentStatus === 'COMPLETED') {
          setReqeustList(response.data.reservations);
        } else if (currentStatus === 'CANCELED') {
          setReqeustList(response.data.reservations);
        }
        if (reservation) console.log('받아온거', reservation);
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

  const handleReservationConfirm = () => {
    // reservationConfirmed();
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
    //setCurrentStatus('REQUESTED');
    setIsItemCardClicked(true);
    setSelectedLendCard(lendCardData);
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
            <LendPeriod>예약기간</LendPeriod>
            {currentStatus === 'CANCELED' ? (
              <div>{`${lendCardData.startDate}`}</div>
            ) : (
              <div>{`${lendCardData.startDate} - ${lendCardData.endDate}`}</div>
            )}
          </LendDatesWrapper>
          <LendButtonWapper>
            {currentStatus === 'REQUESTED' && (
              <DefaultBtn
                color={colorPalette.whiteColor}
                backgroundColor={colorPalette.deepMintColor}
                // onClick={}
              >
                예약 확정
              </DefaultBtn>
            )}
            {currentStatus === 'REQUESTED' && (
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

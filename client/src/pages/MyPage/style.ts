import styled from 'styled-components';
import { colorPalette } from '../../../src/common/utils/enum/colorPalette';
import { PiStarFill } from 'react-icons/pi';
import { DefaultBtn } from '../../common/style/style';
import { BoxShadow } from '../../../src/common/utils/enum/boxShadow';
import { fontSize } from '../../../src/common/utils/enum/fontSize';

//MyPage
export const ProfileWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 0.5rem;
  height: 200px;
  box-shadow: ${BoxShadow.Basic};
  border-radius: 3px;
`;
export const EditWrapper = styled.button`
  display: flex;
  justify-content: flex-end;
  font-size: ${fontSize.small};
  color: ${colorPalette.grayTextColor};
  border-style: none;
  cursor: pointer;
  transform: translateX(59rem);
`;
export const ProfileDataWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 3em;
`;
//MypageProfile
export const MypageProfileWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 2000px;
  height: 86px;
`;
export const MypageLeft = styled.div`
  display: flex;
`;
export const MypageRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -0.5rem;
`;
export const MypageImage = styled.div`
  margin-right: 1.5rem;
  img {
    border-radius: 50px;
    width: 86px;
    height: 86px;
    object-fit: cover;
  }
`;
export const MypageInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Location = styled.div`
  display: flex;
  align-items: center;
  color: ${colorPalette.grayTextColor};
  font-size: ${fontSize.small};
`;
export const LocationContent = styled.div`
  display: flex;
  align-items: center;
  & svg {
    margin-right: 0.5rem;
  }
  & div {
    margin-right: 0.5rem;
  }
`;
export const EvaluationItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: ${fontSize.small};
  img {
    border-radius: 50px;
    width: 86px;
    height: 86px;
  }
`;

export const EvaluationScore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//Paging
export const PagingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  margin-top: 10rem;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: inline-block;
    align-items: center;
    justify-content: center;
    color: ${colorPalette.basicTextColor};
    font-weight: 300;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 50%;

    &:active {
      color: ${colorPalette.whiteColor};
      opacity: 80%;
      background-color: ${colorPalette.deepMintColor};
    }
    &:focus {
      background-color: ${colorPalette.deepMintColor};
      color: ${colorPalette.whiteColor};
      opacity: 80%;
    }
  }
`;
//Tap

export const TapWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colorPalette.borderColor};
  margin-bottom: 3rem;
`;
export const ParentWrapper = styled.div`
  display: flex;
`;
export const CustomTapButton = styled.button`
  padding: 12px 24px;

  background-color: transparent; /* 배경색을 투명으로 설정 */
  color: ${colorPalette.basicTextColor};
  font-size: 12px;
  font-weight: bold;
  border: none;
  line-height: 1.5;
  cursor: pointer;
  /* transition: color 1ms ease-in-out; */

  &:disabled {
    opacity: 0.5; /* 비활성화 시 투명도 조정 */
    cursor: not-allowed;
  }
  &:active {
    color: ${colorPalette.deepMintColor};
    border-bottom: 1px solid ${colorPalette.deepMintColor};
    background-color: transparent; /* 배경색을 투명으로 설정 */
  }
  &:focus {
    color: ${colorPalette.deepMintColor};
    border-bottom: 1px solid ${colorPalette.deepMintColor};
    background-color: transparent; /* 배경색을 투명으로 설정 */
  }
`;

//ProfileEdit
export const MyPageEdit = styled.div`
  display: grid;
`;
export const ProfileEditWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  transform: translateY(4rem);
  box-shadow: ${BoxShadow.Basic};
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const UploadBtn = styled.button`
  font-size: 12px;
  width: 80px;
  height: 32px;
  background-color: ${colorPalette.whiteColor};
  color: ${colorPalette.basicTextColor};
  border-radius: 3px;
  border: 1px solid ${colorPalette.grayTextColor};
`;
export const ProfilerEdit = styled.div`
  display: none;
`;
export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const NameWrapper = styled.div`
  display: grid;
  align-items: center;
  margin: 0rem 1rem 0rem 3rem;

  font-size: 14px;
  font-weight: 600;
  div {
    align-items: center;
    margin-top: 0.3rem;
  }
`;
export const InputWrapper = styled.div`
  display: grid;
  align-items: center;
`;
export const InputBox = styled.div`
  margin-bottom: 0.4rem;
  input {
    align-items: center;
    width: 180px;
    height: 25px;
    padding-left: 10px;
  }
`;
export const TownBtn = styled(DefaultBtn)`
  cursor: pointer;
  font-size: 10px;
  width: 80px;
  height: 22px;
`;
export const ProfileImg = styled.div`
  margin-bottom: -0.2rem;
  img {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(8rem);

  input,
  button {
    height: 28px;
    width: 80px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    &:active {
      transform: scale(0.98);
    }
  }
`;
export const DelBtn = styled.button`
  display: flex;
  flex-direction: row-reverse;
  border: none;
  background-color: transparent;
  color: ${colorPalette.grayTextColor};

  transform: translate(-0.8rem, 15rem);

  cursor: pointer;
`;

//RatingStar
export const RatingStarWapper = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0px;
  .inactive {
    color: ${colorPalette.grayColor};
  }
  .active {
    color: ${colorPalette.accentColor};
  }
`;

export const RatingStarBox = styled(PiStarFill)`
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 2px;
  margin-top: -10px;
`;
export const Index = styled.div`
  margin: 0 5px;
  font-size: 12px;
`;

//Modal
export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  height: 180px;
  width: 316px;
  padding-top: 2rem;
  box-shadow: ${BoxShadow.Basic};
`;

export const ButtonWapper = styled.div`
  justify-content: space-around;
  padding: 10px 40px;
`;
export const ButtonWapper2 = styled.div`
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  margin-top: 1rem; /* 원하는 여백 설정 */
`;

export const Close = styled(DefaultBtn)`
  justify-content: space-around;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
`;
export const Rating = styled(DefaultBtn)``;

//WishList

export const WishListWrapper = styled.div`
  display: flex;
`;
export const WishCardWrapper = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
`;
export const LendListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
export const LendListContainer = styled.div`
  display: flex;
`;
//BorrowList

export const BorrowWrapper = styled.div`
  display: flex;

  button {
    border: 1px solid ${colorPalette.deepMintColor};
    box-shadow: none;
    border-radius: 20px;
    margin-left: 1rem;
    width: 10rem;
    &:focus {
      background-color: ${colorPalette.deepMintColor};
      color: ${colorPalette.whiteColor};
      opacity: 80%;
    }
    &:active {
      background-color: ${colorPalette.deepMintColor};
      color: ${colorPalette.whiteColor};
    }
  }
`;
export const BorrowCardWrappre = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
// LendList

export const LendWrapper = styled.div`
  button {
    border: 1px solid ${colorPalette.deepMintColor};
    box-shadow: none;
    border-radius: 20px;
    margin-left: 1rem;
    width: 10rem;
    &:focus {
      background-color: ${colorPalette.deepMintColor};
      color: ${colorPalette.whiteColor};
      opacity: 80%;
    }
    &:active {
      background-color: ${colorPalette.deepMintColor};
      color: ${colorPalette.whiteColor};
    }
  }
`;

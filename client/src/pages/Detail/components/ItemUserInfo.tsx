import { ItemUserInfoProps } from '../type';
import {
  ItemUserInfoContainer,
  ItemUserProfile,
  ItemUserInfoText,
} from '../style';
const ItemUserInfo = ({ userName, address, userImage }: ItemUserInfoProps) => {
  return (
    <ItemUserInfoContainer>
      <ItemUserProfile>
        <img src={userImage} />
      </ItemUserProfile>
      <ItemUserInfoText>
        <h5>{userName}</h5>
        <p>{address}</p>
      </ItemUserInfoText>
    </ItemUserInfoContainer>
  );
};

export default ItemUserInfo;

import { ItemUserInfoProps } from '../type';
import {
  ItemUserInfoContainer,
  ItemUserProfile,
  ItemUserInfoText,
} from '../style';
const ItemUserInfo = ({ userName, address }: ItemUserInfoProps) => {
  return (
    <ItemUserInfoContainer>
      <ItemUserProfile>
        <img src="https://i.pinimg.com/564x/e8/5a/a8/e85aa8db825d3ceff3e7cecaa99b940d.jpg" />
      </ItemUserProfile>
      <ItemUserInfoText>
        <h5>{userName}</h5>
        <p>{address}</p>
      </ItemUserInfoText>
    </ItemUserInfoContainer>
  );
};

export default ItemUserInfo;

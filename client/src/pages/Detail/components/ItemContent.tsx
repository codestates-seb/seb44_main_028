import { ItemContentContainer } from '../style';
const ItemContent = () => {
  return (
    <ItemContentContainer>
      <ItemInfoWrapper>
        <ItemImageWrapper></ItemImageWrapper>
        <ItemUserWrapper></ItemUserWrapper>
      </ItemInfoWrapper>
      <ItemDescriptionWrapper></ItemDescriptionWrapper>
    </ItemContentContainer>
  );
};

export default ItemContent;

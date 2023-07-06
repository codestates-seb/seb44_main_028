import styled from 'styled-components';
import { fontSize } from '../utils/enum/fontSize';

export const CategoryContainer = styled.div``;
export const CategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${fontSize.basic};
  & img {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
`;

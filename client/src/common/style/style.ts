import styled from 'styled-components';
import { fontSize } from '../utils/enum/fontSize';

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4.275rem 2.4rem;
`;
export const CategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${fontSize.basic};
  cursor: pointer;
  & img {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
`;

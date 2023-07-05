import React, { Dispatch, SetStateAction } from 'react';
import { RatingStarWapper, RatingStarBox, Index } from '../style';
import { RatingStarType } from '../type';

function RatingStar({ ratingIndex, setRatingIndex }: RatingStarType) {
  const ArrayIdx = [1, 2, 3, 4, 5];

  return (
    <RatingStarWapper>
      {ArrayIdx.map((arrayindex, idx) => (
        <RatingStarBox
          key={`rating_${idx}`}
          // 여기가 핵심
          className={arrayindex <= ratingIndex ? 'active' : 'inactive'}
          onClick={() => setRatingIndex(arrayindex)}
        />
      ))}

      <Index>
        {ratingIndex === 5
          ? '아주 좋아요'
          : ratingIndex === 4
          ? '맘에 들어요'
          : ratingIndex === 3
          ? '보통이에요'
          : ratingIndex === 2
          ? '그냥 그래요'
          : '별로에요'}
      </Index>
    </RatingStarWapper>
  );
}

export default RatingStar;

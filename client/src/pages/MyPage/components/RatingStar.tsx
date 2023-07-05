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
          ? ''
          : ratingIndex === 4
          ? ''
          : ratingIndex === 3
          ? ''
          : ratingIndex === 2
          ? ''
          : ''}
      </Index>
    </RatingStarWapper>
  );
}

export default RatingStar;

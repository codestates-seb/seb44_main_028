import { Dispatch, SetStateAction } from 'react';

export type RatingStarType = {
  ratingIndex: number;
  setRatingIndex: Dispatch<SetStateAction<number>>;
};

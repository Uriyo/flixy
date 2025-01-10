import { RatingOption } from '../types/filters';

export const RATING_OPTIONS: RatingOption[] = [
  { 
    value: 'all', 
    label: 'All Ratings',
    min: 0, 
    max: 10 
  },
  { 
    value: 'top', 
    label: '8+ Rating',
    min: 8, 
    max: 10 
  },
  { 
    value: 'good', 
    label: '6-8 Rating',
    min: 6, 
    max: 7.9 
  },
  { 
    value: 'average', 
    label: '4-6 Rating',
    min: 4, 
    max: 5.9  
  },
  { 
    value: 'below', 
    label: 'Below 4',
    min: 0, 
    max: 3.9 
  }
];

export const CURRENT_YEAR = new Date().getFullYear();
export const YEAR_RANGE = {
  min: 1900,
  max: CURRENT_YEAR
};
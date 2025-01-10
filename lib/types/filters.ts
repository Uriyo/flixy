export interface MovieFilters {
    genre?: string;
    minRating?: number;
    maxRating?:number;
    search?: string;
    minYear?:number;
    maxYear?:number;
  }
  
  export interface RatingOption {
    value: string;
    label: string;  
    min: number;
    max: number;
  }
  
  export interface FilterChangeHandler {
    onFilterChange: (filters: MovieFilters) => void;
  }
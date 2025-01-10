import { useCallback, useState } from 'react';
import { SearchBar } from '../search-bar';
import { RatingFilter } from './rating-filter';
import { YearRangeFilter } from './year-range-filter';
import { MovieFilters } from '@/lib/types/filters';
import { YEAR_RANGE } from '@/lib/constants/filter-options';
import { debounce } from 'lodash';

interface FilterSectionProps {
  onFilterChange: (filters: MovieFilters) => void;
}

const defaultMinYear = 1900; 
const defaultMaxYear = new Date().getFullYear(); 

export function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [filters, setFilters] = useState<MovieFilters>({
    search: '',
    minRating: 0,
    maxRating: 10,
    minYear: YEAR_RANGE.min ?? 1900, // Fallback to 2000 if YEAR_RANGE.min is undefined
    maxYear: YEAR_RANGE.max ?? 2025, // Fallback to 2025 if YEAR_RANGE.max is undefined
  });

  const debouncedUpdateFilters = useCallback(
    debounce((newFilters: Partial<MovieFilters>) => {
      onFilterChange(newFilters as MovieFilters); // Trigger parent callback with updated filters
    }, 500), // 500ms debounce delay
    [] // Ensure this function is created only once
  );

  const updateFilters = (newFilters: Partial<MovieFilters>) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      debouncedUpdateFilters(updatedFilters);
      //onFilterChange(updatedFilters); // Pass updated filters to parent
      return updatedFilters;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={filters.search || ''}
            onChange={(value) => updateFilters({ search: value })}
          />
        </div>
        <RatingFilter
          minRating={filters.minRating}
          maxRating={filters.maxRating}
          onChange={(min, max) => updateFilters({ minRating: min, maxRating: max })}
        />
      </div>
      <YearRangeFilter
        startYear={filters.minYear ?? defaultMinYear} 
        endYear={filters.maxYear ?? defaultMaxYear}
        onChange={(start, end) => updateFilters({ minYear: start, maxYear: end })}
      />
    </div>
  );
}

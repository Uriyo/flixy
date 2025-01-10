"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RATING_OPTIONS } from "@/lib/constants/filter-options";

interface RatingFilterProps {
  minRating: number | undefined;
  maxRating: number | undefined;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

export function RatingFilter({ minRating, maxRating, onChange }: RatingFilterProps) {
  // Handle rating change by passing min and max values
  const handleRatingChange = (value: string) => {
    const selectedOption = RATING_OPTIONS.find(option => option.value === value);
    if (selectedOption) {
      onChange(selectedOption.min, selectedOption.max);
    }
  };

  // Get the current rating label based on minRating and maxRating
  const currentLabel = RATING_OPTIONS.find(
    option => option.min === minRating && option.max === maxRating
  )?.label || "Filter by Rating";

  return (
    <Select value={currentLabel} onValueChange={handleRatingChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Rating" />
      </SelectTrigger>
      <SelectContent>
        {RATING_OPTIONS.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

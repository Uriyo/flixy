"use client";

import { Slider } from "@/components/ui/slider";
import { YEAR_RANGE } from "@/lib/constants/filter-options";

interface YearRangeFilterProps {
  startYear: number;  // Accept startYear separately
  endYear: number;    // Accept endYear separately
  onChange: (start: number, end: number) => void; // Expect two separate values in onChange
}

export function YearRangeFilter({ startYear, endYear, onChange }: YearRangeFilterProps) {
  const handleSliderChange = (values: number[]) => {
    const [start, end] = values; // Destructure the array into start and end values
    onChange(start, end); // Pass start and end separately to onChange
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Year Range</span>
        <span>{startYear} - {endYear}</span> {/* Display startYear and endYear separately */}
      </div>
      <Slider
        min={YEAR_RANGE.min}
        max={YEAR_RANGE.max}
        step={1}
        value={[startYear, endYear]} // Pass startYear and endYear as separate values
        onValueChange={handleSliderChange}
        className="w-full"
      />
    </div>
  );
}

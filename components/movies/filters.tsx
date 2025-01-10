"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { genrefilters } from "@/lib/constants/genres";

interface FiltersProps {
  rating: string;
  onRatingChange: (value: string) => void;
}


export function Filters({ rating, onRatingChange }: FiltersProps) {
  return (
    <>
      <Select value={rating} onValueChange={onRatingChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ratings</SelectItem>
          <SelectItem value="high">High (8+)</SelectItem>
          <SelectItem value="medium">Medium (5-7)</SelectItem>
          <SelectItem value="low">Low (- 5)</SelectItem>
        </SelectContent>
      </Select>
      <Select value={rating} onValueChange={onRatingChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Genre" />
        </SelectTrigger>
        <SelectContent>
          {genrefilters.map((filter:string , index:number) => (
            <SelectItem key={index} value={filter}>
              {filter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
"use client"

import { Progress } from "@/components/ui/progress";

interface PlotRatingProps {
  plot: number;
  acting: number;
  visuals: number;
  sound: number;
}

export function PlotRating({ plot, acting, visuals, sound }: PlotRatingProps) {
  const ratings = [
    { label: "Plot & Story", value: plot },
    { label: "Acting", value: acting },
    { label: "Visual Effects", value: visuals },
    { label: "Sound & Music", value: sound },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Ratings Breakdown</h2>
      <div className="space-y-4">
        {ratings.map((rating,index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{rating.label}</span>
              <span className="font-medium">{rating.value}/10</span>
            </div>
            <Progress value={rating.value * 10} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
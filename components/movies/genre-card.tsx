import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface GenreCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onSelect: () => void;
}

export function GenreCard({
  name,
  description,
  icon: Icon,
  onSelect,
}: GenreCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "p-6 rounded-lg border-2 bg-card transition-all hover:scale-105",
        "cursor-pointer hover:shadow-xl"
      )}
    >
      <Icon className={cn("w-8 h-8 mb-4")} />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
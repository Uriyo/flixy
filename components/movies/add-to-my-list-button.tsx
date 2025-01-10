"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddToListButtonProps {
  movieId: number;
}

export function AddToListButton({ movieId }: AddToListButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      // Here you would typically make an API call to add/remove from list
      setIsAdded(!isAdded);
      toast({
        title: isAdded ? "Removed from list" : "Added to list",
        description: isAdded ? "Movie removed from your watchlist" : "Movie added to your watchlist",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update watchlist",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={isAdded ? "secondary" : "default"}
      className="w-full"
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          In My List
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          Add to My List
        </>
      )}
    </Button>
  );
}
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaCard } from "@/components/ui/media-card";
import { TrendingUp, Star, PlayCircle } from "lucide-react"
import { SAMPLE_MEDIA } from "@/data";
import { MediaGrid } from "@/components/ui/media-grid";
export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex mx-auto max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Your Ultimate Entertainment
            <span className="text-primary"> Rating Platform</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Discover and rate your favorite movies, TV shows, and anime. Join
            our community of entertainment enthusiasts.
          </p>
          <div className="space-x-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Trending Now
          </h2>
        </div>

        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-3 mx-auto">
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="tvshows">TV Shows</TabsTrigger>
            <TabsTrigger value="anime">Anime</TabsTrigger>
          </TabsList>
          <TabsContent value="movies" className="mt-6">
          <MediaGrid type="movies" />
          </TabsContent>
          <TabsContent value="tvshows" className="mt-6">
          <MediaGrid type="tvshows" />
          </TabsContent>
          <TabsContent value="anime" className="mt-6">
          <MediaGrid type="anime" />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
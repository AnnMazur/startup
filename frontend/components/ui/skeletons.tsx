import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function VenueCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <Skeleton className="aspect-[4/3] w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/2" />
        <Skeleton className="mt-2 h-4 w-1/3" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-2/3" />
        <div className="mt-3 flex gap-1.5">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardContent>
    </Card>
  );
}

export function FeedPostSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <Skeleton className="aspect-[16/9] w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-2/3" />
        <Skeleton className="mt-4 h-4 w-32" />
      </CardContent>
    </Card>
  );
}

export function VenueDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Gallery skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="aspect-[4/3] rounded-xl" />
        <div className="hidden md:grid md:grid-cols-2 md:gap-4">
          <Skeleton className="aspect-[4/3] rounded-xl" />
          <Skeleton className="aspect-[4/3] rounded-xl" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-28" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function EventTemplateCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <Skeleton className="h-16 w-16 rounded-2xl" />
        <Skeleton className="mt-4 h-7 w-32" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-2/3" />
        <Skeleton className="mt-4 h-4 w-28" />
        <Skeleton className="mt-4 h-5 w-40" />
      </CardContent>
    </Card>
  );
}

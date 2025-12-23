import { Skeleton } from "./Skeleton";

export default function HourlyForecastSkeleton() {
  const skeletonItems = Array(8).fill(null);

  return (
    // Hourly items skeleton
    <div className="mt-4 space-y-4">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="bg-neutral-700 border border-neutral-600 py-2.5 pl-3 pr-4 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-5 w-12" />
          </div>
          <Skeleton className="h-5 w-8" />
        </div>
      ))}
    </div>
  );
}

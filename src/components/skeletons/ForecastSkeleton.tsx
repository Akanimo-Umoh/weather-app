import { Skeleton } from "./Skeleton";

export default function ForecastSkeleton() {
  // Create 7 skeleton cards to match your forecast count
  const skeletonCards = Array(7).fill(null);

  return (
    <div className="flex flex-wrap gap-4 md:flex-nowrap">
      {skeletonCards.map((_, index) => (
        <div key={index} className="w-[103.66px] md:max-w-[103.66px]">
          <Skeleton className="flex flex-col items-center justify-center gap-4 px-2.5 py-4 rounded-xl bg-neutral-800 border border-neutral-600 h-[165px]">
            {/* Day skeleton */}
          </Skeleton>
        </div>
      ))}
    </div>
  );
}

export default function WeatherCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5 w-full">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-neutral-0 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-neutral-0 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-neutral-0 rounded-full animate-bounce"></div>
      </div>
      <p className="text-neutral-200 text-preset-6">Loading...</p>
    </div>
  );
}

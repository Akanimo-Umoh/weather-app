export type WeatherProps = {
  title: string;
  value: string | number;
  isLoading: boolean;
};

export default function WeatherDetails({
  title,
  value,
  isLoading = false,
}: WeatherProps) {
  return (
    <div className="flex flex-col gap-6 p-5 rounded-xl bg-neutral-800 border border-neutral-600 h-full">
      <p className="text-preset-6 text-neutral-200">{title}</p>
      {isLoading ? (
        <p className="text-preset-3">–</p>
      ) : (
        <p className="text-preset-3 text-white">{value}</p>
      )}
    </div>
  );
}

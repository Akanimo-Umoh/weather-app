import error from "../assets/images/icon-error.svg";
import retry from "../assets/images/icon-retry.svg";

export default function ServerError() {
  return (
    <div className="space-y-6 pt-10 mt-16 flex flex-col items-center justify-center">
      <img src={error} alt="" />
      <p className="text-preset-2 text-neutral-0">Something went wrong</p>
      <p className="text-preset-5 text-neutral-200 text-center max-w-[554px]">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <div className="rounded-lg bg-[#262540] flex items-center justify-center gap-2.5 py-3 px-4">
        <img src={retry} alt="" />
        <p className="text-preset-7 text-neutral-0">Retry</p>
      </div>
    </div>
  );
}

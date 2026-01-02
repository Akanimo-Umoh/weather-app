import error from "../assets/images/icon-error.svg";
import retry from "../assets/images/icon-retry.svg";

export default function ServerError() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6 pt-10 mt-16 flex flex-col items-center justify-center px-6">
      <img src={error} alt="" />
      <p className="text-preset-2 text-neutral-0">Something went wrong</p>
      <p className="text-preset-5 text-neutral-200 text-center max-w-[554px]">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        type="button"
        onClick={handleRetry}
        className="rounded-lg bg-[#262540] flex items-center justify-center gap-2.5 py-3 px-4 cursor-pointer"
      >
        <img src={retry} alt="" />
        <p className="text-preset-7 text-neutral-0">Retry</p>
      </button>
    </div>
  );
}

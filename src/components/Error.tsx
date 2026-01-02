import { Link } from "react-router-dom";
import error from "../assets/images/icon-error.svg";

export default function Error() {
  return (
    <div className="space-y-6 flex flex-col items-center justify-center px-6 min-h-screen">
      <img src={error} alt="" />
      <p className="text-preset-2 text-neutral-0">404</p>
      <p className="text-preset-5 text-neutral-200 text-center max-w-[554px]">
        We couldn’t find the page you are looking for
      </p>

      <Link
        to="/"
        className="rounded-lg bg-neutral-600 flex items-center justify-center gap-2.5 py-3 px-4 cursor-pointer hover:bg-neutral-700"
      >
        <p className="text-preset-7 text-neutral-0">Go back home</p>
      </Link>
    </div>
  );
}

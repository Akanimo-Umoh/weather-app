import search from "../assets/images/icon-search.svg";

export default function Search() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-4">
      <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-neutral-800 text-neutral-200 w-full">
        <label htmlFor="search" className="">
          <img src={search} alt="search" className="w-5 h-5" />
        </label>
        <input
          type="text"
          name="search"
          id="search"
          className="outline-none flex-1 text-preset-5 placeholder:text-neutral-200 text-neutral-200"
          placeholder="Search for a place..."
        />
      </div>

      <button className="rounded-xl px-6 py-4 w-full bg-blue-500 text-neutral-0 text-preset-5 md:w-auto">
        Search
      </button>
    </div>
  );
}

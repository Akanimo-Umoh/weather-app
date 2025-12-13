import logo from "../assets/images/logo.svg";
import units from "../assets/images/icon-units.svg";
import dropdown from "../assets/images/icon-dropdown.svg";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-4 pt-4 md:px-6 md:pt-6 lg:px-28">
      <div className="weather now">
        <img
          src={logo}
          alt=""
          className="w-[137.9px] h-7 md:w-[197px] md:h-10"
        />
      </div>

      <div className="w-fit bg-neutral-800 rounded-[6px] flex items-center justify-center gap-1.5 px-2.5 py-2 md:px-4 md:py-3 md:rounded-lg">
        <img src={units} alt="units" className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span className="font-dm font-medium text-neutral-0 text-[14px] leading-[120%] md:text-[16px]">
          Units
        </span>
        <img
          src={dropdown}
          alt="dropdown"
          className="w-[9px] h-3.5 md:w-3 md:h-4.5"
        />
      </div>
    </nav>
  );
}

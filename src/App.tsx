import Nav from "./components/Nav";
import Search from "./components/Search";
import sunny from "./assets/images/icon-sunny.webp";
import storm from "./assets/images/icon-storm.webp";
import rain from "./assets/images/icon-rain.webp";
import snow from "./assets/images/icon-snow.webp";
import fog from "./assets/images/icon-fog.webp";
import cloudy from "./assets/images/icon-partly-cloudy.webp";
import drizzle from "./assets/images/icon-drizzle.webp";

function App() {
  return (
    <div className="flex justify-center w-full min-h-svh">
      <div className="w-full max-w-[1216px]">
        {/* navbar */}
        <section className="">
          <Nav />
        </section>

        {/* hero */}
        <section className="mt-12 px-4 flex items-center justify-center lg:mt-16">
          <p className="text-preset-2 max-w-[330px] md:max-w-[482px] lg:max-w-full text-white">
            How’s the sky looking today?
          </p>
        </section>

        {/* main container */}
        <section className="mt-12 px-4 md:px-6 lg:mt-16 lg:px-28 border space-y-8">
          {/* search container */}
          <div className="lg:w-[656px] mx-auto">
            <Search />
          </div>

          {/* weather main ctn */}
          <div>
            <div>
              <div>
                {/* country details */}
                <div className="today w-[343px] h-[286px] rounded-[20px] px-6 flex flex-col items-center justify-center gap-4 md:w-full md:flex-row md:justify-between">
                  <div className="flex flex-col items-center justify-center gap-3 md:items-start">
                    <p className="text-preset-4 text-neutral-0">Berlin, Germany</p>
                    <p className="text-preset-6 text-neutral-0">Tuesday, Aug 5, 2025</p>
                  </div>

                  <div className="flex items-center justify-between gap-5">
                    <div className="">
                      <img src={sunny} alt="weather mood" className="w-[120px] h-[120px]" />
                    </div>
                    <p className="text-preset-1 text-white">20°</p>
                  </div>
                </div>

                <div>boom</div>
              </div>

              <div></div>
            </div>

            {/* side forecast */}
            <div></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;

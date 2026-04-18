"use client";

import MwgCards from "./MwgCards";

export default function Hero() {

  return (
    <div className="pt-48 pb-15.75 ">
      {/* Hero content */}
      <div className="flex flex-col gap-8">
        <div className="w-2/3 ">
          <h1 className="text-[115px]  font-bold leading-none ">
            Get Hyped. Get Noticed. Get Results.
          </h1>
        </div>
        <div>
          <p className="text-3xl font-semibold ">
            Klaar met gokken op content <br /> die niets oplevert?
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-20">
        <MwgCards />
      </div>


    </div>
  );
}

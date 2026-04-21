"use client";

import Image from "next/image";
import Link from "next/link";

export default function Stats() {
  return (
    <div className="grid grid-cols-12 py-30 ">
      {/* Heading */}
      <div className="md:col-start-2 col-start-1 lg:col-span-8 col-span-10  mb-24">
        <h2 className="text-5xl lg:text-6xl font-bold leading-none">
          Wij maken content die opvalt. Die blijft hangen. Die jouw doelgroep
          raakt en jouw merk in beweging brengt. Snel, krachtig en energiek.
        </h2>
      </div>

      {/* Media block */}
      <div className="col-span-12 md:col-start-1 md:col-span-2 md:row-start-2  ">
        {/* Mobile: video */}
        <div className="block md:hidden">
          <video
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover rounded-2xl"
          >
            <source
              src="https://gethyped.b-cdn.net/New%20Reach/new-reach-loop.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="hidden md:block relative w-full h-100">
          <Image
            src="/images/girl1.webp"
            alt="Anniek Bril"
            fill
            className="object-cover rounded-2xl"
            sizes="(max-width: 960px) 100vw, 960px"
            draggable={false}
          />
        </div>
      </div>

      {/* Mobile spacer */}
      <div className="col-span-12 pb-24 md:hidden" />

      {/* Text + CTA */}
      <div className="col-span-12 md:col-start-5 md:col-span-4 flex justify-end flex-col gap-8">
        <p className="text-lg md:text-3xl font-bold leading-none">
          We stoppen niet bij mooie plaatjes en vette beelden. We maken het
          meetbaar. Zo weet je precies wat werkt en wat niet. Nooit meer content
          zonder strategie. Nooit meer content zonder resultaat.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 border px-3 py-2 rounded-2xl "
          >
            <span className=" text-xl font-bold">Leer ons kennen</span>
            <div className="border p-3 rounded-xl bg-black ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                viewBox="0 0 22 21"
                fill="none"
                className="text-white "
              >
                <path
                  d="M11.2832 20.9176L9.14509 18.8002L15.5491 12.3962L-0.00939941 12.3962L-0.00939941 9.30322L15.5491 9.30322L9.14509 2.9096L11.2832 0.78186L21.3511 10.8497L11.2832 20.9176Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Scroll down arrow — desktop only */}
      <div className="hidden md:flex  col-start-11 row-start-2 col-span-1 items-end justify-end">
        <Link
          href="#expertises"
          className="group inline-flex items-center justify-center w-15 h-15 border border-current rounded-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 26 27"
            fill="none"
            className="text-red-400 "
          >
            <path
              d="M0.876668 14.4267L3.42629 11.852L11.1376 19.5634L11.1376 0.828689L14.8621 0.828689L14.8621 19.5634L22.5609 11.852L25.123 14.4267L12.9999 26.5498L0.876668 14.4267Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
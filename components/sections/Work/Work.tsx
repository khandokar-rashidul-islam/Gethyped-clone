"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface WorkItem {
  title: string;
  brand: string;
  image: string;
  video: string;
}

export default function WorkPage() {
  const works: WorkItem[] = [
    {
      title: "Van nul naar vol, binnen 3 weken",
      brand: "Bullit",
      image: "/images/girl3.avif",
      video: "https://gethyped.b-cdn.net/Bullit/Bullit%20%7C%20Loop.mp4",
    },
    {
      title: "Zacht in smaak, sterk in beeld",
      brand: "Roasta",
      image: "/images/pack.avif",
      video: "https://gethyped.b-cdn.net/Roasta/roasta-loop.mp4",
    },
    {
      title: "Content die écht smaakt (en raakt)",
      brand: "Loco",
      image: "/images/girl4.avif",
      video: "https://gethyped.b-cdn.net/Loco/loco-bites-loop.mp4",
    },
  ];

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      viewBox="0 0 28 27"
      fill="none"
      className="work-card_icon-svg w-7 h-7 "
    >
      <path
        d="M14.9554 26.0653L12.2003 23.337L20.4522 15.0851L0.404297 15.0851L0.404297 11.0996L20.4522 11.0996L12.2003 2.86109L14.9554 0.119385L27.9284 13.0923L14.9554 26.0653Z"
        fill="currentColor"
      />
    </svg>
  );


  const colors2 = ["border-[#fa5424]", "border-[#0d8dff]", "border-[#33c791]"];
 const brandColors = ["#fa5424", "#0d8dff", "#33c791"]; 
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <section className="flex flex-col gap-20 py-25">
      {/* HERO SECTION */}
      <div className=" max-w-155 mx-35 ">
        <h2 className="text-[115px] leading-none font-bold mb-6">
          Content dat scoort.
        </h2>

        <p className="text-4xl font-semibold max-w-2xl mb-10 ">
          Wij vertellen jouw verhaal. Op een manier die écht past bij jouw
          doelgroep. Met creatieve content die werkt en het verschil maakt.
        </p>

        <Link
          href="/work"
          className="group inline-flex items-center gap-3 border px-3 py-2 rounded-2xl"
        >
          <span className=" text-xl font-semibold ">Bekijk al ons werk</span>

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

      <div className="flex justify-between px-25 h-150  ">
        {works.map((work, index) => (
          <div
            key={index}
            className={`relative group rounded-4xl w-120 h-150 border-8 overflow-hidden flex p-5 flex-col justify-end ${colors2[index]}`}
            style={{
              transform: `translateY(-${index * 110}px)`,
            }}
            onMouseEnter={() => videoRefs.current[index]?.play()}
            onMouseLeave={() => {
              const video = videoRefs.current[index];
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            }}
          >
            {/* IMAGE */}
            <Image
              src={work.image}
              alt={work.brand}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            {/* VIDEO */}
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={work.video}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
            />

            {/* TEXT */}
            <div className="relative group w-full h-60 bg-transparent">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <svg
                  viewBox="0 0 429 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M428.625 35.0862V208C428.625 214.627 423.252 220 416.625 220L12 220C5.37258 220 0 214.627 0 208V77.9695C0 70.9826 5.03458 65.0132 11.904 63.8674L388.605 1.00885C409.565 -2.47661 428.625 13.7568 428.625 35.0862Z"
                    style={{ fill: brandColors[index % brandColors.length] }}
                  />
                </svg>
              </div>

              {/* Content Layer */}
              <div className="relative p-5 w-80 text-white h-full flex flex-col justify-end">
                <h3 className="text-3xl font-bold leading-tight">
                  {work.title}
                </h3>
                <p className="text-xl w-fit px-3 py-3 mt-1 rounded-xl tracking-widest font-medium bg-white/30 ">
                  {work.brand}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-10 right-2 -translate-y-1/2 z-30 w-15 h-15 overflow-hidden bg-white rounded-full -rotate-40 ">
                <div className="absolute inset-0 flex items-center justify-center text-black transition-transform duration-400 ease-in-out group-hover:translate-x-full">
                  <ArrowIcon />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-black -translate-x-full transition-transform duration-400 ease-in-out group-hover:translate-x-0">
                  <ArrowIcon />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

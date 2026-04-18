"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

interface ExpertiseData {
  id: number;
  label: string;
  heading: string;
  number: string;
  videoSrc: string;
  subheading: string;
  paragraph: string;
  href: string;
  buttonText: string;
  color: string;
}

const EXPERTISE_DATA: ExpertiseData[] = [
  {
    id: 1,
    label: "Expertise",
    heading: "Social strategy",
    number: "01",
    videoSrc: "https://gethyped.b-cdn.net/MD/MD%20Loop%20Schaken.mp4",
    subheading: "Slimme strategie. Sterke start.",
    paragraph:
      "We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die écht impact maken.",
    href: "/expertises/social-strategie",
    buttonText: "Meer over social strategy",
    color: "#FFFFFF",
  },
  {
    id: 2,
    label: "Expertise",
    heading: "Content creation",
    number: "02",
    videoSrc: "https://gethyped.b-cdn.net/Expertises/Loop%20BTS%20comp.mp4",
    subheading: "Content die opvalt en raakt.",
    paragraph: "We maken content die opvalt en blijft hangen.",
    href: "/expertises/content-creatie",
    buttonText: "Meer over content",
    color: "#fcb8fa",
  },
  {
    id: 3,
    label: "Expertise",
    heading: "Activation",
    number: "03",
    videoSrc: "https://gethyped.b-cdn.net/Over%20de%20Top/overdetop-loop.mp4",
    subheading: "Zichtbaar waar het telt.",
    paragraph: "We verspreiden content waar jouw doelgroep is.",
    href: "/expertises/activatie",
    buttonText: "Meer over activation",
    color: "#33c791",
  },
  {
    id: 4,
    label: "Expertise",
    heading: "Data",
    number: "04",
    videoSrc: "https://gethyped.b-cdn.net/Expertises/Data%20comp.mp4",
    subheading: "Inzichten die impact maken.",
    paragraph: "We analyseren data en sturen content bij.",
    href: "/expertises/data",
    buttonText: "Meer over data",
    color: "#0d8dff",
  },
];

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 22 21">
      <path
        d="M11.2832 20.9176L9.14509 18.8002L15.5491 12.3962L-0.00939941 12.3962L-0.00939941 9.30322L15.5491 9.30322L9.14509 2.9096L11.2832 0.78186L21.3511 10.8497L11.2832 20.9176Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ExpertiseCard({
  data,
  i,
  progress,
  range,
}: {
  data: ExpertiseData;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const total = EXPERTISE_DATA.length;

  // ✅ GSAP-like smooth shrink (NO layout change)
  const scale = useTransform(progress, range, [1, 0.85]);

  // ✅ Proper fade out like ScrollTrigger
  const opacity = useTransform(
    progress,
    [range[0], range[1] - 0.1, range[1]],
    [1, 1, 0],
  );

  // ✅ Image/video zoom effect (GSAP fromTo equivalent)
  const videoScale = useTransform(progress, range, [1.15, 1]);

  return (
    <div className="sticky top-0">
      <motion.div
        style={{
          backgroundColor: data.color,
          scale,
          opacity,
          height: "90vh", // ❗ unchanged (your design preserved)
          transformOrigin: "center",
        }}
        className="relative flex flex-col w-full rounded-3xl p-15 mb-25 shadow-xl"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest opacity-50">
            {data.label}
          </span>
          <h2 className="text-2xl font-bold text-center flex-1">
            {data.heading}
          </h2>
          <span className="text-4xl font-black opacity-10">{data.number}</span>
        </div>

        {/* BODY */}
        <div className="flex gap-10 h-full">
          {/* LEFT */}
          <div className="w-[40%] flex flex-col justify-between pt-[10%]">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">{data.subheading}</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                {data.paragraph}
              </p>
            </div>

            <Link
              href={data.href}
              className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:opacity-60 transition-opacity mt-6"
            >
              {data.buttonText}
              <ArrowIcon />
            </Link>
          </div>

          {/* RIGHT (GSAP-like zoom area) */}
          <div className="w-[60%] relative rounded-2xl overflow-hidden h-80">
            <motion.div className="w-full h-full" style={{ scale: videoScale }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={data.videoSrc} type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExpertiseSection() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      style={{
        position: "relative",
        height: `${EXPERTISE_DATA.length * 100}vh`,
      }}
    >
      {EXPERTISE_DATA.map((project, i) => {
        const start = i / EXPERTISE_DATA.length;
        const end = (i + 1) / EXPERTISE_DATA.length;

        return (
          <ExpertiseCard
            key={project.id}
            data={project}
            i={i}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </div>
  );
}

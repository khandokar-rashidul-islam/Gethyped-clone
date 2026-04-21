"use client";
import {
  useScroll,
} from "framer-motion";
import { useRef } from "react";
import ServiceCard from "./ServiceCard";

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
  color2: string;
  color3?: string;
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
      "We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die écht impact maken. Zo weet je precies waarom het werkt",
    href: "/expertises/social-strategie",
    buttonText: "Meer over social strategy",
    color: "#FFFFFF",
    color2: "#FA5424",
    color3: "#EAE4D8",
  },
  {
    id: 2,
    label: "Expertise",
    heading: "Content creation",
    number: "02",
    videoSrc: "https://gethyped.b-cdn.net/Expertises/Loop%20BTS%20comp.mp4",
    subheading: "Content die opvalt en raakt.",
    paragraph:
      "We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek. Altijd met het doel voor ogen.",
    href: "/expertises/content-creatie",
    buttonText: "Meer over content",
    color: "#fcb8fa",
    color2: "white",
    color3: "white",
  },
  {
    id: 3,
    label: "Expertise",
    heading: "Activation",
    number: "03",
    videoSrc: "https://gethyped.b-cdn.net/Over%20de%20Top/overdetop-loop.mp4",
    subheading: "Zichtbaar waar het telt.",
    paragraph:
      "De juiste content verdient het om gezien te worden. We verspreiden de content waar jouw doelgroep is. Zo raakt jouw merk de juiste mensen, precies waar en wanneer het telt.",
    href: "/expertises/activatie",
    buttonText: "Meer over activation",
    color: "#33c791",
    color2: "white",
    color3: "white",
  },
  {
    id: 4,
    label: "Expertise",
    heading: "Data",
    number: "04",
    videoSrc: "https://gethyped.b-cdn.net/Expertises/Data%20comp.mp4",
    subheading: "Inzichten die impact maken.",
    paragraph:
      "We duiken in de cijfers om te snappen wat écht werkt. En sturen jouw content scherp bij.",
    href: "/expertises/data",
    buttonText: "Meer over data",
    color: "#0d8dff",
    color2: "white",
    color3: "white",
  },
];


export default function Services() {
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

      className="py-28"
    >
      {EXPERTISE_DATA.map((project, i) => {
        return (
          <ServiceCard
            key={project.id}
            data={project}
            i={i}
            progress={scrollYProgress}
            totalCards={EXPERTISE_DATA.length}
          />
        );
      })}
    </div>
  );
}

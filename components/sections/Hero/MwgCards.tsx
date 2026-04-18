"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface CardData {
  id: number;
  type: "text" | "video";
  title?: string;
  subtitle?: string;
  paragraph?: string;
  src?: string;
  imgSrc?: string;
  className: string;
  initialRotate: number;
}

const BASE_CARD_DATA: Omit<CardData, "initialRotate">[] = [
  {
    id: 1,
    type: "text",
    title: "10M+",
    subtitle: "Organische views",
    paragraph: "Groei door slimme content",
    className: "bg-brand-blue text-[#161616]",
  },
  {
    id: 2,
    type: "video",
    src: "https://gethyped.b-cdn.net/Salontopper/Loop%20Salontopper.mp4",
    imgSrc: "/images/thumb2.avif",
    className: "bg-gray-200",
  },
  {
    id: 3,
    type: "text",
    title: "30+",
    subtitle: "Merken geholpen",
    paragraph: "Van start-up tot multinational",
    className: "bg-brand-green text-[#161616] hidden md:flex",
  },
  {
    id: 4,
    type: "video",
    src: "https://gethyped.b-cdn.net/Petrol%20Head/petrolhead-loop.mp4",
    imgSrc: "/images/thumb2.avif",
    className: "bg-gray-200 hidden lg:flex",
  },
];
const ROTATIONS = BASE_CARD_DATA.map(() => Math.random() * 18 - 8);

export default function MwgCards() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const cards: CardData[] = BASE_CARD_DATA.map((card, i) => ({
    ...card,
    initialRotate: ROTATIONS[i],
  }));

  return (
    <motion.div layout className="w-full flex justify-center relative">
      {cards.map((card, index) => (
        <InteractiveCard
          key={card.id}
          data={card}
          index={index}
          isHovered={hoveredId === card.id}
          onHoverStart={() => setHoveredId(card.id)}
          onHoverEnd={() => setHoveredId(null)}
        />
      ))}
    </motion.div>
  );
}

function InteractiveCard({
  data,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  data: CardData;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{
        y: 60,
        opacity: 0,
        scale: 1,
      }}
      animate={{
        y: isHovered ? -12 : 0,
        opacity: 1,
        rotate: isHovered ? 0 : data.initialRotate,
        scale: isHovered ? 1.15 : 1,
        marginLeft: isHovered ? 100 : -16,
        marginRight: isHovered ? 100 : -16,
        marginTop: isHovered ? 12 : 0,
        marginBottom: isHovered ? 12 : 0,
      }}
      transition={{
        opacity: {
          delay: index * 0,
          duration: 0.3,
          ease: [0.5, 0, 0.1, 1],
        },
        rotate: { type: "spring", stiffness: 300, damping: 30 },
        scale: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 300, damping: 30 },
        marginLeft: { type: "spring", stiffness: 300, damping: 30 },
        marginRight: { type: "spring", stiffness: 300, damping: 30 },
        marginTop: { type: "spring", stiffness: 300, damping: 30 },
        marginBottom: { type: "spring", stiffness: 300, damping: 30 },
        layout: { type: "spring", stiffness: 500, damping: 30 },
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      style={{ zIndex: isHovered ? 50 : 1, originX: 0.5, originY: 0.5 }}
      className={`w-110 h-140 rounded-4xl shadow-xl
        flex flex-col justify-center overflow-hidden
        relative cursor-pointer -mx-4 ${data.className}`}
    >
      {data.type === "text" ? (
        <div className="flex flex-col justify-between h-full p-6">
          <div>
            <h1 className="text-7xl font-bold mb-3">{data.title}</h1>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{data.subtitle}</h2>
            <div className="w-full h-px bg-current my-3 opacity-40" />
            <p className="text-base opacity-75">{data.paragraph}</p>
          </div>
        </div>
      ) : (
        <>
          {data.imgSrc && (
            <Image
              src={data.imgSrc}
              alt="card image"
              fill
              className="object-cover absolute inset-0"
              sizes="(max-width: 768px) 100vw, 33vw"
              draggable={false}
              priority={index === 0}
            />
          )}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={data.src} type="video/mp4" />
          </video>
        </>
      )}
    </motion.div>
  );
}

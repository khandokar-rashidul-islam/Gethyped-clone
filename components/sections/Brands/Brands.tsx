"use client";

import Image from "next/image";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useCallback, useState } from "react";

const clients = [
  {
    name: "Bullit Digital",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/69241146b4df63c4ca966552_Bullit%20Digital.svg",
  },
  {
    name: "Morssinkhof",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68c194e6d1b186563459b107_morssinkhof.svg",
  },
  {
    name: "Salontopper",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d88f755388cc2c74ecff_salontopper.svg",
  },
  {
    name: "Seesing Flex",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d880bed5996600cbc586_seesing-flex.svg",
  },
  {
    name: "Graafschap College",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d86cd6ba384af3c14e58_graafschap-college.svg",
  },
  {
    name: "Fides",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d85341bf0d7476e56a8c_fides.svg",
  },
  {
    name: "SRHK",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d838fc5735f090bd9843_SRHK.svg",
  },
  {
    name: "KNLTB",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d81e72e08110e3fd1a17_knltb.svg",
  },
  {
    name: "THO",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/684b062ebc242028ca4b3ea1_tho.svg",
  },
  {
    name: "De Talententuin",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/684c05642bf8f5cea7384403_de-talententuin.svg",
  },
  {
    name: "ZCLV",
    src: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68c1952f22281ee50d3620b5_zclv.svg",
  },
];

const CARD_HEIGHT = 350;
const CARD_WIDTH = 350;
const GAP = 16;
const CARD_STRIDE = CARD_WIDTH + GAP;
const TOTAL_WIDTH = clients.length * CARD_STRIDE;
const BASE_SPEED = 3.5;

// unique Y offset per slot — alternating up/down so it looks broken
const Y_OFFSETS = [10, -14, 8, -10, 16, -8, 12, -16, 6, -12, 14];

export default function ClientsMarquee() {
  const x = useMotionValue(0);
  const skewX = useMotionValue(0);
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const hasStarted = useRef(false);
  const [pressing, setPressing] = useState(false);

  useAnimationFrame(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      return;
    }

    velocity.current *= 0.96;
    if (Math.abs(velocity.current) < 0.05) velocity.current = 0;

    skewX.set(skewX.get() * 0.85);

    if (isDragging.current) return;

    const speed = BASE_SPEED + velocity.current;
    let next = x.get() - speed;
    if (next <= -TOTAL_WIDTH) next += TOTAL_WIDTH;
    if (next > 0) next -= TOTAL_WIDTH;
    x.set(next);
  });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    velocity.current = 0;
    setPressing(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - lastX.current;
      lastX.current = e.clientX;

      let next = x.get() + delta;
      if (next <= -TOTAL_WIDTH) next += TOTAL_WIDTH;
      if (next > 0) next -= TOTAL_WIDTH;
      x.set(next);

      velocity.current = -delta * 0.8;
      skewX.set(delta * 0.3);
    },
    [x, skewX],
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    setPressing(false);
  }, []);

  return (
    <div className="py-20 border-b border-black/20">
      {/* Heading */}
      <div className="max-w-120 mb-10">
        <h2 className="text-7xl font-bold">These brands got hyped.</h2>
      </div>

      {/* Marquee track */}
      <div
        className="overflow-hidden w-full cursor-grab active:cursor-grabbing select-none "
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
        onPointerLeave={() => {
          isDragging.current = false;
          setPressing(false);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div
          className="flex items-center"
          style={{
            x,
            skewX,
            gap: GAP,
            width: "max-content",
            paddingBlock: "40px", // extra vertical room for Y scatter
          }}
        >
          {[...clients, ...clients, ...clients].map((client, index) => {
            const slot = index % clients.length;
            const yOffset = Y_OFFSETS[slot];

            return (
              <motion.div
                key={index}
                className="flex items-center justify-center shrink-0 rounded-2xl border border-black/20 px-4 py-4"
                style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                animate={{
                  y: pressing ? yOffset : 0,
                  scale: pressing ? 0.95 : 1,
                }}
                transition={{
                  delay: pressing
                    ? slot * 0.015
                    : (clients.length - slot) * 0.008,
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                }}
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={200}
                  height={44}
                  className="object-contain pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

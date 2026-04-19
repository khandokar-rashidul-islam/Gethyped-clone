import { useTransform, MotionValue, useSpring } from "framer-motion";

interface Params {
  i: number;
  totalCards: number;
  progress: MotionValue<number>;
  isLast: boolean;
}

export function useServiceCardAnimation({
  i,
  totalCards,
  progress,
  isLast,
}: Params) {
  // divide scroll into equal segments
  const segment = 1 / totalCards;
  const cardStart = i * segment;
  const cardEnd = cardStart + segment;

  // normalize progress per card (0 → 1)
  const localProgress = useTransform(progress, [cardStart, cardEnd], [0, 1], {
    clamp: true,
  });

  // video zoom
  const videoScale = useTransform(localProgress, [0, 1], [1.12, 1], {
    clamp: true,
  });

  // scale animation
  const scale = useTransform(
    localProgress,
    [0.4, 1],
    isLast ? [1, 1] : [1, 0.85],
    { clamp: true },
  );

  // opacity (late fade)
  const opacity = useTransform(
    localProgress,
    [0.85, 1],
    isLast ? [1, 1] : [1, 0],
    { clamp: true },
  );

  // blur (premium exit feel)
  const blur = useTransform(localProgress, [0.7, 1], isLast ? [0, 0] : [0, 6], {
    clamp: true,
  });

  // vertical movement (depth)
  const y = useTransform(localProgress, [0, 1], isLast ? [0, 0] : [0, -40], {
    clamp: true,
  });

  // springs (smooth feel)
  const smoothScale = useSpring(scale, {
    stiffness: 80,
    damping: 20,
  });

  const smoothOpacity = useSpring(opacity, {
    stiffness: 80,
    damping: 14,
  });

  const smoothVideoScale = useSpring(videoScale, {
    stiffness: 60,
    damping: 18,
  });

  const smoothY = useSpring(y, {
    stiffness: 80,
    damping: 20,
  });

  const smoothBlur = useSpring(blur, {
    stiffness: 80,
    damping: 20,
  });

  const blurFilter = useTransform(smoothBlur, (v: number) => `blur(${v}px)`);

  return {
    smoothScale,
    smoothOpacity,
    smoothVideoScale,
    smoothY,
    blurFilter,
  };
}

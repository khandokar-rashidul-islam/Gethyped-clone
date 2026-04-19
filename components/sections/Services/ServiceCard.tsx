import { useServiceCardAnimation } from "@/hooks/useServiceCardAnimation";
import { motion, MotionValue } from "framer-motion";
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
  color2: string;
  color3?: string;
}

interface ServiceCardProps {
  data: ExpertiseData;
  i: number;
  progress: MotionValue<number>;
  totalCards: number;
}

export default function ServiceCard({
  data,
  i,
  progress,
  totalCards,
}: ServiceCardProps) {
  const isLast = i === totalCards - 1;

  const { smoothScale, smoothOpacity, smoothVideoScale, smoothY, blurFilter } =
    useServiceCardAnimation({
      i,
      totalCards,
      progress,
      isLast,
    });

  return (
    <div className="sticky top-15 mb-10 ">
      <motion.div
        style={{
          backgroundColor: data.color,
          height: "90vh",
          scale: smoothScale,
          opacity: smoothOpacity,
          y: smoothY,
          zIndex: totalCards - i,
          filter: blurFilter,
          transformOrigin: "center top",
        }}
        className="w-full rounded-3xl p-15 shadow-xl"
      >
        <Link
          href="/"
          className=" flex h-full flex-col justify-between overflow-hidden"
        >
          {/* Top */}
          <div className="flex h-1/3 justify-between ">
            <div className="flex flex-col gap-3 ">
              <span
                className="text-xl w-fit font-semibold uppercase px-3 py-1 rounded-md"
                style={{ backgroundColor: data.color3 }}
              >
                {data.label}
              </span>
              <h2 className="text-9xl font-bold ">{data.heading}</h2>
            </div>
            <div
              style={{ color: data.color3 }}
              className="text-9xl font-bold opacity-50 "
            >
              {data.number}
            </div>
          </div>

          {/* Bottom */}
          <div className=" flex h-2/3 justify-between  ">
            <div className="flex w-1/2 flex-col justify-end  ">
              <div className="flex flex-col gap-4 w-1/2">
                <h3 className="text-3xl font-bold tracking-tighter ">
                  {data.subheading}
                </h3>
                <p className="text-xl font-semibold tracking-tight ">
                  {data.paragraph}
                </p>
              </div>

              <button
                className={`group inline-flex items-center gap-3  px-3 py-2 rounded-2xl mt-10 w-fit text-xl font-semibold cursor-pointer `}
                style={{
                  backgroundColor: data.id === 1 ? data.color2 : data.color3,
                  color: data.id === 1 ? "white" : "black",
                }}
              >
                {data.buttonText}
                <div
                  className="border p-3 rounded-xl  "
                  style={{
                    backgroundColor: data.id === 1 ? "white" : "black",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14"
                    viewBox="0 0 22 21"
                    fill="none"
                    style={{
                      color: data.id === 1 ? "black" : "white",
                    }}
                  >
                    <path
                      d="M11.2832 20.9176L9.14509 18.8002L15.5491 12.3962L-0.00939941 12.3962L-0.00939941 9.30322L15.5491 9.30322L9.14509 2.9096L11.2832 0.78186L21.3511 10.8497L11.2832 20.9176Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>
            </div>
            <motion.div
              className="w-1/2 relative"
              style={{ scale: smoothVideoScale }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute  rounded-xl right-20 bottom-20 rotate-3 h-110 w-90 object-cover"
                style={{ border: `7px solid ${data.color2}` }}
              >
                <source src={data.videoSrc} type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

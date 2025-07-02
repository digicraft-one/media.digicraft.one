import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

// Utility function to join class names (replace with your own or use a library like clsx if needed)
const images = [
  "/gallery/1.webp",
  "/gallery/2.webp",
  "/gallery/3.webp",
  "/gallery/4.webp",
  "/gallery/5.webp",
  "/gallery/6.webp",
  "/gallery/7.webp",
  "/gallery/9.webp",
  "/gallery/10.webp",
  "/gallery/11.webp",
  "/gallery/12.webp",
  "/gallery/13.webp",
  "/gallery/14.webp",
  "/gallery/15.webp",
  "/gallery/16.webp",
  "/gallery/17.webp",
  "/gallery/18.webp",
  // "/gallery/19.webp",
  "/gallery/20.webp",
  "/gallery/21.webp",
  "/gallery/22.webp",
  "/gallery/23.webp",
  "/gallery/24.webp",
  "/gallery/25.webp",
  "/gallery/26.webp",
  "/gallery/27.webp",
  "/gallery/28.webp",
  "/gallery/29.webp",
  "/gallery/30.webp",
];

function cn(...args) {
  return args.filter(Boolean).join(" ");
}

// Replace Next.js Image with standard img for React
const Img = ({ src, className, height, width, alt }) => (
  <img
    src={src}
    className={className}
    height={height}
    width={width}
    alt={alt}
    loading="lazy"
    style={{ objectFit: "cover" }}
  />
);

export function ParallaxScroll({ className }) {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third - 2);
  const thirdPart = images.slice(2 * third - 2);

  return (
    <div
      id="scroll"
      className={cn("h-[50rem] items-start overflow-y-auto w-full mt-10", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-8xl mx-auto gap-20 pt-10 px-10"
      >
        <div className="grid gap-16">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
            >
              <Img
                src={el}
                className="h-80 w-full border md:object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-16">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <Img
                src={el}
                className="h-80 w-full border md:object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-16">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <Img
                src={el}
                className="h-80 w-full border md:object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

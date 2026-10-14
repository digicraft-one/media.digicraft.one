import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [posterReady, setPosterReady] = useState(false);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  const getPosterSrc = (index) => `img/hero-${index}.webp`;

  const nextIndex = (currentIndex % totalVideos) + 1;
  const mainIndex =
    currentIndex === totalVideos - 1 ? 1 : currentIndex;

  useEffect(() => {
    let cancelled = false;
    setPosterReady(false);

    const img = new Image();
    img.src = getPosterSrc(mainIndex);
    const markReady = () => {
      if (!cancelled) setPosterReady(true);
    };

    if (img.complete) {
      markReady();
    } else {
      img.onload = markReady;
      img.onerror = markReady;
    }

    return () => {
      cancelled = true;
    };
  }, [mainIndex]);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div
      className={`relative h-dvh w-screen overflow-x-hidden ${
        posterReady ? "" : "bg-black"
      }`}
    >
      <div
        id="video-frame"
        className={`relative z-10 h-dvh w-screen overflow-hidden rounded-lg ${
          posterReady ? "bg-blue-75" : "bg-black"
        }`}
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc(nextIndex)}
                  poster={getPosterSrc(nextIndex)}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            poster={getPosterSrc(currentIndex)}
            loop
            muted
            playsInline
            preload="metadata"
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />
          <video
            src={getVideoSrc(mainIndex)}
            poster={getPosterSrc(mainIndex)}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 text-right" style={{
          transformOrigin: "right"
        }}>
          M<b>E</b>DIA
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              {/* redefi<b>n</b>e */}
              digicra<b>f</b>t
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Motion graphics–led edits that make your clips look designed—not just cut.
            </p>

            <Link to="/pricing">
              <Button
                id="watch-trailer"
                title="See pricing"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex-center gap-1"
              />
            </Link>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black" style={{
        transformOrigin: "right"
      }}>
        {/* G<b>A</b>MING */}
        M<b>E</b>DIA
      </h1>
    </div>
  );
};

export default Hero;

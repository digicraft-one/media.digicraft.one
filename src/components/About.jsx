import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { FaExpand, FaCompress, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const WEB_VIDEO = "videos/digicraft-v5-16x9-web.mp4";
const PHONE_VIDEO = "videos/digicraft-v5-9x16-phone.mp4";
const POSTER = "img/about.png";

// Survives re-renders; set on first real user gesture (click/tap/key)
let audioUnlocked = false;

const About = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const sectionActiveRef = useRef(false);
  const userMutedRef = useRef(false); // true only if user clicked mute
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getVideoSrc = () =>
    window.matchMedia("(max-width: 768px)").matches ? PHONE_VIDEO : WEB_VIDEO;

  const ensureSrc = () => {
    const video = videoRef.current;
    if (!video) return null;

    const src = getVideoSrc();
    if (!video.dataset.srcLoaded || video.dataset.srcLoaded !== src) {
      video.src = src;
      video.dataset.srcLoaded = src;
      video.load();
    }
    return video;
  };

  const applySoundOn = (video) => {
    if (userMutedRef.current) return;
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
    video.removeAttribute("muted");
    setIsMuted(false);
  };

  const playAboutVideo = async ({ fromStart = true } = {}) => {
    const video = ensureSrc();
    if (!video) return;

    if (fromStart) {
      try {
        video.currentTime = 0;
      } catch {
        // ignore
      }
    }

    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // Prefer sound on whenever allowed
    if (!userMutedRef.current) {
      applySoundOn(video);
    }

    const tryPlay = async (muted) => {
      video.muted = muted;
      if (muted) video.setAttribute("muted", "");
      else video.removeAttribute("muted");
      setIsMuted(muted);
      await video.play();
      setIsPlaying(true);
    };

    // 1) Sound on
    try {
      await tryPlay(false);
      return;
    } catch {
      // blocked
    }

    // 2) If user already gestured somewhere on the site, retry sound once
    if (audioUnlocked && !userMutedRef.current) {
      try {
        applySoundOn(video);
        await tryPlay(false);
        return;
      } catch {
        // still blocked
      }
    }

    // 3) Play muted so video runs; unmute as soon as audio is unlocked
    try {
      await tryPlay(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const unmuteIfAllowed = async () => {
    const video = videoRef.current;
    if (!video || userMutedRef.current) return;
    if (!sectionActiveRef.current && video.paused) return;

    applySoundOn(video);
    try {
      if (video.paused && sectionActiveRef.current) {
        await video.play();
        setIsPlaying(true);
      }
    } catch {
      // ignore
    }
  };

  const pauseAboutVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement
    ) {
      return;
    }
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      // ignore
    }
    setIsPlaying(false);
  };

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    audioUnlocked = true;

    if (video.muted || isMuted) {
      userMutedRef.current = false;
      applySoundOn(video);
      try {
        if (video.paused) await video.play();
        setIsPlaying(true);
      } catch {
        // ignore
      }
    } else {
      userMutedRef.current = true;
      video.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current;
    const video = videoRef.current;
    if (!player) return;

    audioUnlocked = true;

    try {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.webkitDisplayingFullscreen
      ) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (video?.webkitExitFullscreen) video.webkitExitFullscreen();
        return;
      }

      if (player.requestFullscreen) {
        await player.requestFullscreen();
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      } else if (video?.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }

      await unmuteIfAllowed();
    } catch (err) {
      console.error("Fullscreen failed:", err);
    }
  };

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          sectionActiveRef.current = true;
          playAboutVideo({ fromStart: true });
        },
        onEnterBack: () => {
          sectionActiveRef.current = true;
          playAboutVideo({ fromStart: true });
        },
        onLeave: () => {
          sectionActiveRef.current = false;
          pauseAboutVideo();
        },
        onLeaveBack: () => {
          sectionActiveRef.current = false;
          pauseAboutVideo();
        },
      },
    });

    clipAnimation.to("#clip .mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  useEffect(() => {
    const onFullscreenChange = () => {
      const active = Boolean(
        document.fullscreenElement || document.webkitFullscreenElement
      );
      setIsFullscreen(active);
      if (active) unmuteIfAllowed();
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  // Unlock audio on first real gesture, then force sound on if About is active
  useEffect(() => {
    const unlock = () => {
      audioUnlocked = true;
      unmuteIfAllowed();
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  // Warm the correct source early so play+sound is more reliable
  useEffect(() => {
    ensureSrc();
  }, []);

  useEffect(() => {
    const onResize = () => {
      const video = videoRef.current;
      if (!video || !sectionActiveRef.current) return;

      const nextSrc = getVideoSrc();
      if (video.dataset.srcLoaded !== nextSrc) {
        const time = video.currentTime;
        video.src = nextSrc;
        video.dataset.srcLoaded = nextSrc;
        video.load();
        video.currentTime = time;
        if (!userMutedRef.current) applySoundOn(video);
        video.play().catch(() => {});
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Digicraft Media
        </p>

        <AnimatedTitle
          title="Design <b>any</b> edit, <br /> animate <b>every</b> story with Digicraft Media"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>
            Your clips, our craft—motion graphics editing for creators and everyday
            brands.
          </p>
          <p className="text-gray-500">
            Digicraft Media turns raw footage into polished videos with titles,
            effects, and motion that feel intentional.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div
          ref={playerRef}
          className={`mask-clip-path about-image bg-[#d9d8e3] ${
            isFullscreen
              ? "!rounded-none !w-screen !h-screen !left-0 !top-0 !translate-x-0"
              : ""
          }`}
        >
          <video
            ref={videoRef}
            poster={POSTER}
            className="absolute left-0 top-0 size-full object-cover"
            playsInline
            preload="auto"
            loop
            controls={false}
            muted={false}
            onPlaying={() => {
              setIsPlaying(true);
              // If browser started muted against our will, flip back when unlocked
              const video = videoRef.current;
              if (
                video &&
                video.muted &&
                audioUnlocked &&
                !userMutedRef.current
              ) {
                applySoundOn(video);
              }
            }}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={(e) => {
              if (!userMutedRef.current && e.currentTarget.muted && audioUnlocked) {
                applySoundOn(e.currentTarget);
                return;
              }
              setIsMuted(e.currentTarget.muted);
            }}
          />

          {!isPlaying && (
            <img
              src={POSTER}
              alt="Digicraft Media — every story starts as a frame"
              className="pointer-events-none absolute left-0 top-0 size-full object-cover"
            />
          )}

          <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="flex size-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
            >
              {isMuted ? (
                <FaVolumeMute className="text-sm" />
              ) : (
                <FaVolumeUp className="text-sm" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="flex size-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
            >
              {isFullscreen ? (
                <FaCompress className="text-sm" />
              ) : (
                <FaExpand className="text-sm" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

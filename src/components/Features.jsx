import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import ContactFormModal from "./ContactFormModal";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className={`absolute left-0 top-0 size-full object-cover object-center ${
          typeof title === "string" && title.toString().includes("Media") ? "transform rotate-[35deg]" : ""
        }`}
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font transform scale-x-75 origin-left">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <section className="bg-black pb-52" id="services">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Our Motion Graphics Editing
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Digicraft Media crafts motion-rich edits for creators, businesses, and individuals—clean cuts, kinetic titles, and graphics that make every video feel designed.
          </p>
        </div>

        <BentoTilt className="bento-tilt_1 border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                Social <b>Media</b> Motion
              </>
            }
            description="Reels, Shorts, and TikToks with punchy text, transitions, and effects that stop the scroll—fast turnaround, scroll-stopping polish."
            isComingSoon={false}
          />
        </BentoTilt>

        <div className="grid h-[135vh] w-full grid-cols-1 sm:grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  Long-form <b>Polish</b>
                </>
              }
              description="Vlogs, interviews, and YouTube videos elevated with lower thirds, animated chapters, and motion that keeps viewers watching."
              isComingSoon={false}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  Corporate & <b>Brand</b>
                </>
              }
              description="Promos, explainers, and ads with branded motion graphics—clear messaging, sharp design, and edits that convert."
              isComingSoon={false}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  Event <b>Highlights</b>
                </>
              }
              description="Weddings, conferences, and sports—dynamic highlight reels with graphic overlays and energy that match the moment."
              isComingSoon={false}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 col-span-1 h-64 sm:h-auto">
            <div 
              className="flex size-full flex-col justify-between bg-violet-300 p-5 cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <h1 className="bento-title special-font max-w-64 text-black text-2xl sm:text-3xl md:text-6xl">
                Custom <b>Requests</b> & More
              </h1>

              <TiLocationArrow className="m-5 scale-[3] sm:scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 col-span-1 h-64 sm:h-auto">
            <video
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
      <ContactFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Features;
